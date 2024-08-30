const habits = [];


async function fetchHabits() {
    try {
        const response = await fetch('/habits');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched habits:', data);
        return data;
    } catch (error) {
        console.error('Fetching habits failed:', error);
        return [];
    }
}

function displayHabits(habits) {
    const habitList = document.getElementById('habit-list');
    habitList.innerHTML = ''; 
    habits.forEach(habit => {
        const listItem = document.createElement('li');
        listItem.textContent = habit.title;
        habitList.appendChild(listItem);
    });
}

// Hovedfunksjon
async function main() {

    const fetchedHabits = await fetchHabits();
    habits.push(...fetchedHabits);
    displayHabits(habits);


    document.getElementById('add-habit-button').addEventListener('click', () => {

        const newHabitInput = document.getElementById('new-habit-input');
        const newHabitTitle = newHabitInput.value.trim();


        if (newHabitTitle) {
            const newHabit = {
                id: crypto.randomUUID(),
                title: newHabitTitle,
                createdAt: new Date().toISOString(),
                categories: [] 
            };
            habits.push(newHabit);
            displayHabits(habits);
            newHabitInput.value = '';
        }
    });
}

app();
