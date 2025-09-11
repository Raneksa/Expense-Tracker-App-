model User {
  id         String      @id @default(uuid())
  email      String      @unique
  password   String
  expenses   Expense[]
  incomes    Income[]
  categories Category[]
}

model Expense {
  id          String    @id @default(uuid())
  amount      Float
  date        DateTime
  description String?
  type        String    @default("one-time")
  startDate   DateTime?
  endDate     DateTime?
  receiptUrl  String?
  categoryId  String
  userId      String
  category    Category  @relation(fields: [categoryId], references: [id])
  user        User      @relation(fields: [userId], references: [id])
}

model Income {
  id          String    @id @default(uuid())
  amount      Float
  date        DateTime
  source      String
  description String?
  userId      String
  user        User      @relation(fields: [userId], references: [id])
}

model Category {
  id       String    @id @default(uuid())
  name     String
  userId   String
  user     User      @relation(fields: [userId], references: [id])
  expenses Expense[]
}