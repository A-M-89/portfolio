// tests/projects.test.ts

import Database from 'better-sqlite3';
import { createTables } from '../db/tables'; // Adjust the path as necessary
import { addProject, getProjects } from '../db/index'; // Adjust the path as necessary
import { Project } from '../types'; // Make sure you have a type definition for your project
import test, { beforeEach } from 'node:test';

let db: Database; // Declare db as type Database

beforeAll(() => {
  db = new Database(':memory:'); // Create an in-memory database
  createTables(); // Create tables in the test database
});

beforeEach(() => {
  db.prepare('DELETE FROM projects').run(); // Clear the projects table before each test
});

afterAll(() => {
  db.close(); // Close the database after all tests are done
});
  
// Test to add a new project successfully
test('should add a new project successfully', () => {
  const projectData: Project = {
    name: 'Test Project',
    description: 'Test description',
    isPublic: true,
  };

  addProject(projectData);
  const projects = getProjects();

  expect(projects).toHaveLength(1);
  expect(projects[0]).toMatchObject(projectData);
});

// Test to fail adding a project without a name
test('should fail to add a project without a name', () => {
  const projectData: Project = {
    name: '', // No name provided
    description: 'Test description',
    isPublic: true,
  };

  expect(() => {
    addProject(projectData); // This should throw an error
  }).toThrow();
});

// Test to retrieve all projects
test('should retrieve all projects', () => {
  const projectData1: Project = {
    name: 'Project One',
    description: 'Description for project one',
    isPublic: true,
  };

  const projectData2: Project = {
    name: 'Project Two',
    description: 'Description for project two',
    isPublic: false,
  };

  addProject(projectData1);
  addProject(projectData2);

  const projects = getProjects();

  expect(projects).toHaveLength(2);
  expect(projects).toEqual(
    expect.arrayContaining([
      expect.objectContaining(projectData1),
      expect.objectContaining(projectData2),
    ])
  );
});
function beforeAll(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function afterAll(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function expect(projects: unknown[]) {
  throw new Error('Function not implemented.');
}

