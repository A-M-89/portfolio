import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";

const app = new Hono()
app.use("*", cors());

let students = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

app.get('/api/students', (c) => {
  return c.json(students)})


app.post('/api/c', async (c) => {
  const newStudent = await c.req.json()
  const id = students.length ? students[students.length -1].id +1 : 1
  const student = {id, name: newStudent}
  students.push(student)
  return c.json(students, 201)
})

app.delete('/api/students/:id', (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const initialLength = students.length
  students = students.filter(student => student.id !== id)
  const wasDeleted = students.length < initialLength
  return c.json({ message: wasDeleted ? 'Student deleted' : 'Student not found' })
})

// PATCH /api/students/:id: Oppdatere navn på student
app.patch('/api/students/:id', async (c) => {
  const { id } = c.req.param()
  const { name } = await c.req.json()
  const student = students.find(student => student.id === parseInt(id))
  if (student) {
    student.name = name
    return c.json(student)
  }
  return c.json({ message: 'Student not found' }, 404)
})

const port = 3999
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
