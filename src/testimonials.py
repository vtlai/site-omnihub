"""Render client-approved testimonials; omit the section when none are available."""
from html import escape


def render_testimonials(items):
    if not items:
        return ''
    cards = []
    for item in items:
        fields = {key: escape(str(item[key])) for key in ('name', 'role', 'company', 'quote')}
        avatar = '<svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" focusable="false"><circle cx="24" cy="17" r="9"/><path d="M6 46v-5c0-9 8-15 18-15s18 6 18 15v5Z"/></svg>' 
        cards.append(f'''<figure class="quote-card"><blockquote>“{fields['quote']}”</blockquote><figcaption><span class="quote-avatar" aria-hidden="true">{avatar}</span><div><strong>{fields['name']}</strong><span>{fields['role']}</span><b>{fields['company']}</b></div></figcaption></figure>''')
    sequence = ''.join(cards)
    return f'''<section class="testimonials-carousel section" id="depoimentos" aria-labelledby="testimonials-title"><div class="wrap"><h2 id="testimonials-title">Na rotina de quem usa.</h2></div><div class="quotes-window" tabindex="0" role="region" aria-label="Depoimentos de clientes"><div class="quotes-track"><div class="quotes-sequence">{sequence}</div><div class="quotes-sequence" aria-hidden="true">{sequence}</div></div></div></section>'''
