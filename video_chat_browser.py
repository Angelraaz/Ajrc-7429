from playwright.sync_api import sync_playwright, expect
from urllib.parse import urlparse, parse_qs
from PIL import Image
import json

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/google-chrome', headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width':1440,'height':1000})
    page = context.new_page()
    errors, calls = [], []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('request', lambda r: calls.append(r.url))
    page.goto('http://localhost:4200', wait_until='networkidle')
    video = page.locator('.hero-backdrop video')
    page.wait_for_function('document.querySelector("video").readyState >= 3 && !document.querySelector("video").paused')
    assert video.evaluate('(v)=>v.muted && v.loop && v.playsInline && v.duration===10')
    page.get_by_role('button', name='Pausar video de fondo').click()
    assert video.evaluate('(v)=>v.paused')
    page.evaluate('scrollTo(0,1500)')
    page.wait_for_function('document.querySelector("video").paused')
    page.evaluate('scrollTo(0,0)')
    assert video.evaluate('(v)=>v.paused')
    page.get_by_role('button', name='Reproducir video de fondo').click()
    page.wait_for_function('!document.querySelector("video").paused')
    page.evaluate('scrollTo(0,1500)')
    page.wait_for_function('document.querySelector("video").paused')
    page.evaluate('scrollTo(0,0)')
    page.wait_for_function('!document.querySelector("video").paused')
    page.screenshot(path='/home/user/ajrc-video-desktop.png')
    image = Image.open('packages/web/public/images/ajrc-logo-transparent.png')
    assert image.size == (900,208) and image.getextrema()[3] == (0,255)
    start = len(calls)
    page.get_by_role('button', name='Abrir asistente de servicios').click()
    expect(page.locator('#chat-question')).to_be_focused()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.get_by_role('button', name='Diseño web', exact=True).click()
    expect(page.locator('.chat-message').last).to_contain_text('adaptables a teléfonos')
    page.locator('#chat-question').fill('¿Y cuánto cuesta?')
    page.get_by_role('button', name='Enviar consulta', exact=True).click()
    quote = page.get_by_role('link', name='Solicitar cotización por WhatsApp', exact=False)
    expect(quote).to_be_visible()
    url = urlparse(quote.get_attribute('href'))
    assert url.path == '/584126627894'
    assert 'diseño web' in parse_qs(url.query)['text'][0]
    assert '¿Y cuánto cuesta?' in parse_qs(url.query)['text'][0]
    page.add_script_tag(path='/tmp/ajrc-axe.js')
    for width in [320,360,390,600,768,1024,1440]:
        page.set_viewport_size({'width':width,'height':844})
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), width
        rect = page.get_by_role('dialog').bounding_box()
        assert rect['x']>=0 and rect['y']>=0 and rect['x']+rect['width']<=width, rect
        assert rect['y']+rect['height']<=844, rect
        if width in [320,390,1440]:
            violations = page.evaluate('async()=> (await axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))')
            print('Chat axe', width, json.dumps(violations))
            assert not violations
        if width==390:
            page.screenshot(path='/home/user/ajrc-video-chat-mobile.png')
    page.screenshot(path='/home/user/ajrc-video-chat-desktop.png')
    page.get_by_role('button', name='Reiniciar conversación').click()
    assert page.locator('.chat-message').count()==1
    page.get_by_role('button', name='Diagnóstico remoto', exact=True).click()
    expect(page.locator('.chat-message').last).to_contain_text('no un diagnóstico definitivo')
    page.locator('#chat-question').fill('¿Dónde están?')
    page.keyboard.press('Enter')
    expect(page.locator('.chat-message').last).to_contain_text('653-a')
    page.keyboard.press('Escape')
    expect(page.get_by_role('dialog')).not_to_be_visible()
    expect(page.get_by_role('button', name='Abrir asistente de servicios')).to_be_focused()
    assert not any('/api/rpc' in u for u in calls[start:])
    assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
    page.emulate_media(reduced_motion='reduce')
    page.reload(wait_until='networkidle')
    assert video.evaluate('(v)=>v.paused && !v.autoplay && !v.getAttribute("src")')
    page.get_by_role('button', name='Reproducir video de fondo').click()
    page.wait_for_function('!document.querySelector("video").paused')
    assert not errors, errors
    print('PASS: muted looping video, controls, offscreen pause/resume, reduced-motion static fallback; transparent logo; chat focus, services, contextual quote URL, reset, diagnosis, address, Escape, 7 viewport sizes, axe, no RPC or stored messages.')
    browser.close()