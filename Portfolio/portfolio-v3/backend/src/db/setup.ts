// db/setup.ts

import { createTables } from './tables';
import { getProjects } from './index';
import './seed'; // Ensure seeding happens

createTables();
console.log('Tables created.');

const projects = getProjects();
console.log('Current Projects:', projects);
