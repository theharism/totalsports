import { faker } from '@faker-js/faker'

export const games = Array.from({ length: 20 }, () => {
  return {
    _id: faker.string.uuid(),
    team_one: faker.string.uuid(),
    team_two: faker.string.uuid(),
    name: faker.commerce.productName(),
    slug: faker.commerce.productName(),
    category: faker.string.uuid(),
    live_link: faker.internet.url(),
    important: faker.datatype.boolean(),
    link_highlight: faker.commerce.productName(),
    date_range: faker.datatype.boolean(),
    starting_date: faker.date.future(),
    starting_time: faker.date.future().toLocaleTimeString(),
    ending_date: faker.date.future(),
    ending_time: faker.date.future().toLocaleTimeString(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
