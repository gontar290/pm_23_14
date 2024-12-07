// Додаємо обробник кліків для кожного заголовка
console.log("JavaScript підключено успішно!");
document.addEventListener("click", (event) => {
    const header = event.target.closest('.bold_left, .bold_left_2');
    if (header) {
        console.log(`Клік по елементу: ${header.textContent}`);

        const rightContent = header.closest('.timeline_content').querySelector('.timeline_content_right');
        if (rightContent) {
            rightContent.classList.toggle('hidden');
        } else {
            console.log("Блок .timeline_content_right не знайдений!");
        }
    }
});



//XMLHttpRequest
document.addEventListener('DOMContentLoaded', () => {
const xmlhttp = new XMLHttpRequest();
const url = '/json/data.json'; // Шлях до файлу JSON
xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4) { // Перевіряємо стан завершення запиту
        if (this.status === 200) { // Перевіряємо, чи запит успішний
            console.log('JSON data loaded successfully:', this.responseText);
            const data = JSON.parse(this.responseText);// Парсимо отриманий JSON
            console.log(data.first_name);
            renderData(data); // Функція для відображення даних на сторінці
        } else {
            console.error('Помилка під час завантаження даних');
        }
    }
};
// Відправляємо запит на сервер
xmlhttp.open("GET", url, true);
xmlhttp.send();
});
// Функція для відображення даних на сторінці
function renderData(data) {
    // Вивід імені
    document.getElementById('first_name').textContent = data.first_name;
    document.getElementById('last_name').textContent = data.last_name;

    //Контакти
    document.getElementById('phone').textContent = data.contacts.phone;
    document.getElementById('mail').textContent = data.contacts.mail;
    document.getElementById('web').textContent = data.contacts.web;

    // Професійні навички
    const professionalSkillsContainer = document.getElementById('professional-skills');
    data.skills.professional.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        professionalSkillsContainer.appendChild(li);
    });

    // Технічні навички
    const technicalSkillsContainer = document.getElementById('technical-skills');
    data.skills.technical.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        technicalSkillsContainer.appendChild(li);
    });

    // Соцмережі
    document.getElementById('facebook').textContent = data.social.facebook;
    document.getElementById('linkedin').textContent = data.social.linkedin;
    document.getElementById('behance').textContent = data.social.behance;
    document.getElementById('twitter').textContent = data.social.twitter;
};


// async function getData() {
//     try {
//         const response = await fetch('/json/data.json'); // Запит на сервер
//         if (!response.ok) throw new Error('Error loading data:');
//         const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
//         renderData(data); // Функція для відображення даних на сторінці
//     } catch (error) {
//         console.error('Error retrieving data:', error);
//     }
// }
// // Функція для відображення даних на сторінці
// function renderData(data) {
//     const container = document.getElementById('data-container');
//     data.forEach(item => {
//         const name = document.createElement('h1');
//         name.textContent = `${data.first_name}, ${data.last_name}`;
//         container.appendChild(name);
//     });
// }
// getData(); // Виклик асинхронної функції для отримання даних

