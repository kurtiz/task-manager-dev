import {v4 as uuidv4} from "uuid";
import {API_URL} from "@/constants.ts";


const tasks = [
    {
        "id": uuidv4(),
        "title": "Fix Bug in Login Page",
        "description": "There is an issue with the login page where the submit button doesn't respond on mobile devices.",
        "priority": "High",
        "status": "Pending",
        "due_date": "2025-01-15T17:00:00",
        "start_date": "2025-01-05T09:00:00",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Update User Profile UI",
        "description": "The user profile page needs to be redesigned to follow the new design system.",
        "priority": "Medium",
        "status": "Backlog",
        "due_date": "2025-01-20T18:00:00",
        "start_date": "",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Prepare Monthly Report",
        "description": "Create the financial report for the month of December 2024, including income, expenses, and projections.",
        "priority": "Low",
        "status": "Completed",
        "due_date": "2025-01-05T23:59:00",
        "start_date": "2025-01-02T08:00:00",
        "completion_date": "2025-01-04T16:30:00",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Implement Dark Mode Feature",
        "description": "Implement a dark mode toggle for the mobile app, and ensure all screens support it.",
        "priority": "High",
        "status": "Pending",
        "due_date": "2025-02-01T12:00:00",
        "start_date": "2025-01-06T09:00:00",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Design Homepage Layout",
        "description": "Design a new layout for the homepage, ensuring it follows the latest branding guidelines and is mobile-responsive.",
        "priority": "High",
        "status": "Backlog",
        "due_date": "2025-01-25T17:00:00",
        "start_date": "",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Update API Documentation",
        "description": "Revise the API documentation to reflect the latest changes to endpoints and authentication methods.",
        "priority": "Medium",
        "status": "Pending",
        "due_date": "2025-01-18T12:00:00",
        "start_date": "2025-01-07T14:00:00",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Conduct Quarterly Team Meeting",
        "description": "Schedule and host the quarterly team meeting to discuss performance, goals, and upcoming projects.",
        "priority": "Low",
        "status": "Backlog",
        "due_date": "2025-01-20T14:00:00",
        "start_date": "",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
    {
        "id": uuidv4(),
        "title": "Upgrade Server Infrastructure",
        "description": "Upgrade the company’s server infrastructure to improve performance and add redundancy for failover support.",
        "priority": "High",
        "status": "Pending",
        "due_date": "2025-01-22T18:00:00",
        "start_date": "2025-01-05T11:00:00",
        "completion_date": "",
        "assigned_to": ["b2050464-40a1-7051-9278-b047fb169c81"],
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
    },
];

const uploadTasks = async () => {
    for (const task of tasks) {
        await fetch(`${API_URL}/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJraWQiOiJ1eXNGdU1XYklnd1p4TGJIeVNaR3JWcDRvYVVabU5tNFwvb0oyQ0FWK3U5QT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MmE1NjQwNC1mMDYxLTcwY2ItNDg5OS1jMTZmN2UyNTllZDkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9RRDNRM2o3NjgiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI3ZWQwMjhqN2lzYmI5amU4azZzdW5nODc2NCIsIm9yaWdpbl9qdGkiOiI3MjY0MDI1Yy00NzYxLTQ5NjctYmQxYS01YjkyOGM4OTE0MDgiLCJldmVudF9pZCI6ImQ4NzkxMTcwLTkxMWYtNGY4My04NWY1LTc1ZTllOWFhMTZmMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MzY0NDA4NzAsImV4cCI6MTczNjQ0NDQ3MCwiaWF0IjoxNzM2NDQwODcwLCJqdGkiOiJmNzY5ZGIyMS02Y2U4LTQ5YTQtOTllMS0xYTUyNGNmOWFhODAiLCJ1c2VybmFtZSI6IjkyYTU2NDA0LWYwNjEtNzBjYi00ODk5LWMxNmY3ZTI1OWVkOSJ9.FgiCMKfOGmkGJwRUfSDz73eJ0AJoRoIMPVeEw8sVyj3crLqCWPnJ1Gb7X7KbgrSSEFnMYqC67PGSL3uvKZkJCv-RYpKqlhzjSx0t_IJQ8F8QxOwz541GhVqSfKSfjiCUazNrpOFNTAJjMP6qgR6Yxci9ITHmcKqsN3GnRH3KH7WzPSr6EchSmXY4m8FwaGqpdpSlZbMe9_2Wp2TkW5VjQVG63TVRWUs3XoS4CmUtq9qOs3qusNpMH6KbwxLzvitluQx4bE0quPZxTvwPa6o_Xd7aK8XldACFEn7OZw50bbmBKk1GskT65LDYtbyRAUUmFuwVo3rhB8u8wD4U-6o0SA`
                },
                body: JSON.stringify(task),
            }
        ).then(response => {
            if (response.ok) {
                console.log('Task uploaded successfully');
            } else {
                console.error('Failed to upload task');
            }
        });
    }
    console.log('Tasks have been uploaded');
};

uploadTasks().then();