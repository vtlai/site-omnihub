(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() { navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open)); });
  navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  const videoSlot = document.querySelector('#demo-player');
  document.querySelectorAll('[data-demo]').forEach(trigger => trigger.addEventListener('click', event => {
    if (!videoSlot) return;
    event.preventDefault();
    let iframe = videoSlot.querySelector('iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.title = 'Demonstração da plataforma OmniHub';
      iframe.src = 'https://www.youtube-nocookie.com/embed/ewWse0kbH4g?rel=0&autoplay=1&playsinline=1';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      videoSlot.replaceChildren(iframe);
    }
    if (!trigger.classList.contains('video-cover')) {
      videoSlot.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    iframe.focus({ preventScroll: true });
  }));

  const deliveryTabs = [...document.querySelectorAll('[data-delivery-tab]')];
  function selectDelivery(tab) {
    deliveryTabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected',String(active)); item.tabIndex = active ? 0 : -1; document.querySelector('#'+item.getAttribute('aria-controls')).hidden = !active; });
  }
  deliveryTabs.forEach((tab,index) => {
    tab.addEventListener('click',()=>selectDelivery(tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight') next=(index+1)%deliveryTabs.length;
      if(event.key==='ArrowLeft') next=(index-1+deliveryTabs.length)%deliveryTabs.length;
      if(event.key==='Home') next=0;
      if(event.key==='End') next=deliveryTabs.length-1;
      if(next!==undefined){event.preventDefault();deliveryTabs[next].focus();selectDelivery(deliveryTabs[next]);}
    });
  });
  const integrationFilters = document.querySelector('.integration-filters');
  if (integrationFilters) {
    const carousel = document.querySelector('#integration-carousel');
    const results = document.querySelector('#integration-results');
    const status = document.querySelector('.integration-count');
    const brands = [...carousel.querySelectorAll('.integration-sequence:not([aria-hidden]) .integration-brand')];
    const buttons = [...integrationFilters.querySelectorAll('button')];
    integrationFilters.hidden = false;
    buttons.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.integrationFilter;
      const all = category === 'all';
      const matches = all ? brands : brands.filter(brand => brand.dataset.integrationCategory === category);
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      results.replaceChildren(...(all ? [] : matches.map(brand => brand.cloneNode(true))));
      carousel.hidden = !all;
      results.hidden = all;
      status.hidden = false;
      status.textContent = `${matches.length} ${matches.length === 1 ? 'integração' : 'integrações'} · ${button.textContent}`;
    }));
  }

  const requestForm = document.querySelector('#customization-form');
  if(requestForm) {
    requestForm.querySelector('button[type="submit"]').disabled = false;
    requestForm.addEventListener('submit', event => {
      event.preventDefault();
      const system = requestForm.elements.system;
      if(!system.value.trim()) { system.setCustomValidity('Informe o sistema ou processo que deseja avaliar.'); system.reportValidity(); return; }
      system.setCustomValidity('');
      const data = new FormData(requestForm);
      const message = ['Olá! Quero agendar uma demonstração da OmniHub para minha empresa.', '', `Tipo: ${data.get('type')}`, `Sistema ou processo: ${String(data.get('system')).trim()}`, String(data.get('detail')).trim() ? `Necessidade: ${String(data.get('detail')).trim()}` : '', '', 'Gostaria de entender a viabilidade técnica e as condições no plano anual.'].filter((line,index,all) => line !== '' || all[index-1] !== '').join('\n');
      const destination = new URL('https://wa.me/5519996414843');
      destination.searchParams.set('text',message);
      window.open(destination.href,'_blank','noopener,noreferrer');
    });
    requestForm.elements.system.addEventListener('input', () => requestForm.elements.system.setCustomValidity(''));
  }

  const cards = [...document.querySelectorAll('[data-plan]')];
  if (!cards.length) return;
  const format = value => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let plansPromise;
  async function setCycle(cycle) {
    try {
      plansPromise ||= fetch('/assets/plans.json').then(r => { if(!r.ok) throw new Error('Planos indisponíveis'); return r.json(); });
      const plans = await plansPromise;
      const annual = cycle === 'annual';
      document.querySelectorAll('[data-cycle]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cycle === cycle)));
      cards.forEach(card => {
        const plan = plans[Number(card.dataset.plan)];
        const total = annual ? plan.annual : plan.monthly;
        card.querySelector('[data-price]').textContent = format(annual ? total / 12 : total);
        card.querySelector('[data-billing]').textContent = annual ? `R$ ${format(total)} cobrados ao ano` : 'Cobrança mensal. Sem fidelidade.';
        card.querySelector('[data-annual-benefit]').hidden = !annual;
        const returnUrl = new URL('https://omnihub.site/obrigado/');
        returnUrl.search = new URLSearchParams({ plano: plan.name.toLowerCase(), ciclo: annual ? 'anual' : 'mensal', valor: String(total) });
        const checkout = new URL('https://app.omnihub.site/checkout');
        checkout.search = new URLSearchParams({ plan: plan.name, value: String(total), cycle: annual ? 'YEARLY' : 'MONTHLY', guarantee_days: annual ? '30' : '7', card_only: '1', return_url: returnUrl.href });
        card.querySelector('[data-checkout]').href = checkout.href;
      });
      document.querySelector('[data-guarantee]').textContent = annual ? '30 dias de garantia nos planos anuais.' : '7 dias de garantia nos planos mensais.';
    } catch(error) {
      plansPromise = undefined;
      const note = document.querySelector('[data-guarantee]');
      note.setAttribute('role', 'alert');
      note.textContent = 'Não foi possível atualizar os valores. Recarregue a página ou fale com a equipe.';
    }
  }
  document.querySelectorAll('[data-cycle]').forEach(button => button.addEventListener('click', () => setCycle(button.dataset.cycle)));
})();
