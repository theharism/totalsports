import { faker } from '@faker-js/faker'

export const categories = Array.from({ length: 20 }, () => {
  const name = faker.commerce.productName();
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return {
    name,
    logo: faker.image.url(),
    slug,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
