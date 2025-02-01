import { faker } from '@faker-js/faker'

export const streams = Array.from({ length: 20 }, () => {
  return {
    _id: faker.string.uuid(),
    game: faker.string.uuid(),
    link: faker.internet.url(),
    channel: faker.commerce.productName(),
    ads: faker.datatype.number(),
    language: faker.commerce.productName(),
    quality: faker.helpers.arrayElement(["HD", "SD"]),
    mobile: faker.helpers.arrayElement(["Yes", "No"]),
    nsfw: faker.helpers.arrayElement(["Yes", "No"]),
    ad_block: faker.helpers.arrayElement(["Yes", "No"]),
  }
})
