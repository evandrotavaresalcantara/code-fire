import Url from "../../src/model/Url"

test("Deve retornar uma url", () => {
    const site = 'https://www.dev.io'
    const siteUrl = 'https://www.dev.io/'
    const url = new Url(site)
    expect(url.valor).toBe(siteUrl)
})

test("Deve retornar o dominio completo da url", () => {
    const site = 'https://www.dev.io'
    const dominio = 'www.dev.io'
    const url = new Url(site)
    expect(url.dominio).toBe(dominio)
})

test("Deve validar url", () => {
    const site = 'https://www.dev.io'
    const dominio = 'www.dev.io'
    expect(Url.isValida(site)).toBeTruthy()
    expect(Url.isValida(dominio)).toBeFalsy()
})

test("Deve lançar erro com url inválida", () => {
    const msg = 'url inválida.'
    expect(() => new Url()).toThrow(msg)
    expect(() => new Url("")).toThrow(msg)
    expect(() => new Url("www.dev.io")).toThrow(msg)
    expect(() => new Url("https//www.dev.io")).toThrow(msg)
})


