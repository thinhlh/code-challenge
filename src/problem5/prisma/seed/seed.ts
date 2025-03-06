import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.book.createMany({
        skipDuplicates: true,
        data: [
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                published_date: new Date('1960-07-11'),
                publisher: 'J.B. Lippincott',
                enabled: true,
                category: 'Classic',
                price: 15.99,
            },
            {
                title: '1984',
                author: 'George Orwell',
                published_date: new Date('1949-06-08'),
                publisher: 'Secker & Warburg',
                enabled: true,
                category: 'Dystopian',
                price: 12.99,
            },
            {
                title: 'The Lord of the Rings',
                author: 'J.R.R. Tolkien',
                published_date: new Date('1954-07-29'),
                publisher: 'George Allen & Unwin',
                enabled: true,
                category: 'Fantasy',
                price: 24.99,
            },
            {
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                published_date: new Date('1813-01-28'),
                publisher: 'Thomas Egerton',
                enabled: true,
                category: 'Romance',
                price: 10.99,
            },
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                published_date: new Date('1925-04-10'),
                publisher: 'Charles Scribner',
                enabled: true,
                category: 'Classic',
                price: 14.99,
            },
            {
                title: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                published_date: new Date('1951-07-16'),
                publisher: 'Little, Brown and Company',
                enabled: true,
                category: 'Young Adult',
                price: 11.99,
            },
            {
                title: 'The Hitchhiker Guide to the Galaxy',
                author: 'Douglas Adams',
                published_date: new Date('1979-10-12'),
                publisher: 'Pan Books',
                enabled: true,
                category: 'Science Fiction',
                price: 16.99,
            },
            {
                title: 'The Handmaid Tale',
                author: 'Margaret Atwood',
                published_date: new Date('1985-12-31'),
                publisher: 'McClelland and Stewart',
                enabled: true,
                category: 'Dystopian',
                price: 13.99,
            },
            {
                title: 'The Picture of Dorian Gray',
                author: 'Oscar Wilde',
                published_date: new Date('1890-06-20'),
                publisher: 'Lippincott Monthly Magazine',
                enabled: true,
                category: 'Classic',
                price: 9.99,
            },
            {
                title: 'War and Peace',
                author: 'Leo Tolstoy',
                published_date: new Date('1869-01-01'),
                publisher: 'The Russian Messenger',
                enabled: true,
                category: 'Classic',
                price: 29.99,
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
