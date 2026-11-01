from playwright.sync_api import sync_playwright, expect
from urllib.parse import urlparse, parse_qs
import json

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/google-chrome', headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    errors, calls = [], []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('request', lambda req: calls.append(req.url))
    page.goto('http://localhost:4200', wait_until='networkidle')
    expect(page.locator('html')).to_have_attribute('lang', 'es')
    assert page.locator('main').count() == 1
    expect(page.locator('.brand img')).to_be_visible()
    assert page.locator('.brand img').evaluate('(el)=>el.complete&&el.naturalWidth>0')
    expect(page.locator('a[href="mailto:ajrc.servicios@gmail.com"]')).to_be_visible()
    links = page.locator('a[href^="https://wa.me/"]').evaluate_all('(els)=>els.map(e=>e.href)')
    assert len(links) == 8
    for link in links:
        assert urlparse(link).path == '/584126627894'
        assert parse_qs(urlparse(link).query)['text'][0].startswith('Hola, AjrcServicios.')
    for width in [320,360,390,600,768,1024,1440]:
        page.set_viewport_size({'width':width, 'height':844})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Overflow at {width}'
    page.set_viewport_size({'width':390, 'height':844})
    page.get_by_role('button', name='Abrir menú').click()
    expect(page.locator('#main-nav')).to_be_visible()
    page.get_by_role('navigation').get_by_role('link', name='Servicios', exact=True).click()
    expect(page.locator('#main-nav')).not_to_be_visible()
    page.get_by_role('button', name='Abrir menú').click()
    page.get_by_role('button', name='Cerrar menú').click()
    page.set_viewport_size({'width':1440, 'height':1000})
    page.get_by_text('¿Cómo puedo solicitar una revisión?', exact=True).click()
    expect(page.locator('.faq-list details').first).to_have_attribute('open', '')
    page.get_by_text('¿Cómo puedo solicitar una revisión?', exact=True).click()
    wizard = page.locator('.wizard')
    continu = wizard.get_by_role('button', name='Continuar', exact=True)
    expect(continu).to_be_disabled()
    flows = [
        ('No enciende', 'Hay luces, pero la pantalla está negra', 'Revisemos la alimentación.'),
        ('Está lenta', 'Al encender el equipo', 'Menos carga, más claridad.'),
        ('Se calienta mucho', 'Se apaga por sí sola', 'Dale espacio para respirar.'),
        ('Falla la conexión', 'También fallan otros dispositivos', 'Separemos la red del equipo.'),
        ('Muestra errores', 'Error al iniciar el sistema', 'El mensaje nos da una pista.'),
    ]
    request_count = len(calls)
    for idx, (symptom, detail, title) in enumerate(flows):
        wizard.get_by_role('button', name='Laptop Equipo portátil', exact=True).click()
        continu.click()
        assert wizard.locator('h3').evaluate('(el)=>el===document.activeElement')
        wizard.get_by_role('button', name=symptom, exact=True).click()
        continu.click()
        wizard.get_by_role('button', name=detail, exact=True).click()
        continu.click()
        wizard.get_by_role('button', name='No, ninguna de estas señales', exact=True).click()
        wizard.get_by_role('button', name='Ver orientación').click()
        expect(wizard.locator('h3')).to_have_text(title)
        assert wizard.locator('.wizard-result li').count() == 3
        link = wizard.get_by_role('link', name='Compartir por WhatsApp', exact=False).get_attribute('href')
        text = parse_qs(urlparse(link).query)['text'][0]
        assert symptom in text and detail in text
        if idx == 0:
            wizard.get_by_role('button', name='Copiar resumen').click()
            expect(wizard.locator('output')).to_have_text('Resumen copiado.')
            assert page.evaluate('navigator.clipboard.readText()') == text
        wizard.get_by_role('button', name='Empezar de nuevo').click()
        expect(continu).to_be_disabled()
    for risk in ['Hubo contacto con líquidos', 'Hay olor a quemado o humo', 'La batería parece hinchada']:
        wizard.get_by_role('button', name='Computadora de escritorio PC o todo en uno', exact=True).click(); continu.click()
        wizard.get_by_role('button', name='No enciende', exact=True).click(); continu.click()
        wizard.get_by_role('button', name='No hay luces ni sonido', exact=True).click(); continu.click()
        wizard.get_by_role('button', name=risk, exact=True).click()
        wizard.get_by_role('button', name='Ver orientación').click()
        expect(wizard.locator('h3')).to_have_text('Primero, protege tu seguridad.')
        expect(wizard.locator('li').first).to_contain_text('Suspende el uso')
        wizard.get_by_role('button', name='Volver', exact=True).click()
        expect(wizard.locator('h3')).to_have_text('¿Hay alguna señal de riesgo?')
        wizard.get_by_role('button', name='Atrás', exact=True).click()
        wizard.get_by_role('button', name='Atrás', exact=True).click()
        wizard.get_by_role('button', name='Está lenta', exact=True).click(); continu.click()
        expect(wizard.locator('h3')).to_have_text('¿Cuándo notas la lentitud?')
        expect(continu).to_be_disabled()
        wizard.get_by_role('button', name='Al abrir programas', exact=True).click(); continu.click()
        expect(wizard.get_by_role('button', name='Ver orientación')).to_be_disabled()
        wizard.get_by_role('button', name='No, ninguna de estas señales', exact=True).click()
        wizard.get_by_role('button', name='Ver orientación').click()
        wizard.get_by_role('button', name='Empezar de nuevo').click()
    assert not any('/api/rpc' in u for u in calls[request_count:]), 'Orientador hizo llamadas API'
    assert not errors, errors
    page.emulate_media(reduced_motion='reduce')
    assert page.locator('html').evaluate('(e)=>getComputedStyle(e).scrollBehavior') == 'auto'
    assert page.locator('.hero-copy').evaluate('(e)=>getComputedStyle(e).animationName') == 'none'
    page.goto('http://localhost:4200', wait_until='networkidle')
    page.reload(wait_until='networkidle')
    page.keyboard.press('Tab')
    expect(page.locator('.skip-link')).to_be_focused()
    page.keyboard.press('Enter')
    assert page.url.endswith('#contenido')
    page.add_script_tag(path='/tmp/ajrc-axe.js')
    violations = page.evaluate("""async()=>{let r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));}""")
    print('Accessibility:', json.dumps(violations, ensure_ascii=False, indent=2))
    page.screenshot(path='/home/user/ajrc-desktop-final.png', full_page=True)
    page.set_viewport_size({'width':390,'height':844})
    page.screenshot(path='/home/user/ajrc-mobile-final.png', full_page=True)
    print('PASS: 8 complete UI flows, safety, clipboard, back/reset, links, 7 viewport sizes, menu, FAQ, keyboard, reduced motion; zero runtime errors.')
    browser.close()