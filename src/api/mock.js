export const USE_MOCK = true

export const getMockJson = url => new Promise(resolve => {
  resolve(require(`../mock/${url}.json`))
})