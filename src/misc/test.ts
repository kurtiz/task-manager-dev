import {format} from "date-fns";

const data = [
    {
        "start_date": "",
        "updatedAt": "2025-01-09T17:02:53.028Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Backlog",
        "createdAt": "2025-01-09T17:02:53.028Z",
        "priority": "Medium",
        "due_date": "2025-01-20T18:00:00",
        "description": "The user profile page needs to be redesigned to follow the new design system.",
        "id": "4060e358-82e9-42cc-8037-8b332ecd6ed5",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Update User Profile UI"
    },
    {
        "start_date": "2025-01-05T11:00:00",
        "updatedAt": "2025-01-09T17:02:55.123Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Pending",
        "createdAt": "2025-01-09T17:02:55.123Z",
        "priority": "High",
        "due_date": "2025-01-22T18:00:00",
        "description": "Upgrade the company’s server infrastructure to improve performance and add redundancy for failover support.",
        "id": "97733ef2-4d77-4e11-b2d8-9e47fc8d789e",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Upgrade Server Infrastructure"
    },
    {
        "start_date": "2025-01-06T09:00:00",
        "updatedAt": "2025-01-09T17:02:53.944Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Pending",
        "createdAt": "2025-01-09T17:02:53.944Z",
        "priority": "High",
        "due_date": "2025-02-01T12:00:00",
        "description": "Implement a dark mode toggle for the mobile app, and ensure all screens support it.",
        "id": "d291adcb-d286-49da-9941-6f017fa2bcbd",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Implement Dark Mode Feature"
    },
    {
        "start_date": "2025-01-02T08:00:00",
        "updatedAt": "2025-01-09T17:01:56.968Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Completed",
        "createdAt": "2025-01-09T17:01:56.968Z",
        "priority": "Low",
        "due_date": "2025-01-05T23:59:00",
        "description": "Create the financial report for the month of December 2024, including income, expenses, and projections.",
        "id": "035fe52e-6e79-4a29-92fa-241892cb943f",
        "completion_date": "2025-01-04T16:30:00",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Prepare Monthly Report"
    },
    {
        "start_date": "2025-01-03T09:00:00",
        "updatedAt": "2025-01-09T16:58:38.550Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Completed",
        "createdAt": "2025-01-09T16:58:38.550Z",
        "priority": "Low",
        "due_date": "2025-01-10T12:00:00",
        "description": "Send out a feedback survey to clients to understand their satisfaction with the product and gather suggestions for improvements.",
        "id": "9aa6e167-8d06-47f5-8d89-477bdab56ede",
        "completion_date": "2025-01-09T10:00:00",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Client Feedback Survey"
    },
    {
        "start_date": "",
        "updatedAt": "2025-01-09T17:02:54.234Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Backlog",
        "createdAt": "2025-01-09T17:02:54.234Z",
        "priority": "High",
        "due_date": "2025-01-25T17:00:00",
        "description": "Design a new layout for the homepage, ensuring it follows the latest branding guidelines and is mobile-responsive.",
        "id": "ca3367ab-ee61-49b8-aee1-42807d17f69e",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Design Homepage Layout"
    },
    {
        "start_date": "2025-01-09T10:00:00",
        "updatedAt": "2025-01-09T16:58:36.927Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Completed",
        "createdAt": "2025-01-09T16:58:36.927Z",
        "priority": "Medium",
        "due_date": "2025-01-10T09:00:00",
        "description": "Conduct onboarding session for new developer, covering company policies, development tools, and team structure.",
        "id": "2eddd254-6f52-4fa0-bb67-929b85792c1b",
        "completion_date": "2025-01-09T12:30:00",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Onboard New Employee"
    },
    {
        "start_date": "2025-01-05T09:00:00",
        "updatedAt": "2025-01-09T17:02:52.108Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Pending",
        "createdAt": "2025-01-09T17:02:52.108Z",
        "priority": "High",
        "due_date": "2025-01-15T17:00:00",
        "description": "There is an issue with the login page where the submit button doesn't respond on mobile devices.",
        "id": "026a9cd4-71a3-4ebb-99ed-d744f6b16fcd",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Fix Bug in Login Page"
    },
    {
        "start_date": "",
        "updatedAt": "2025-01-09T17:02:54.790Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Backlog",
        "createdAt": "2025-01-09T17:02:54.790Z",
        "priority": "Low",
        "due_date": "2025-01-20T14:00:00",
        "description": "Schedule and host the quarterly team meeting to discuss performance, goals, and upcoming projects.",
        "id": "b5a43fc1-dd57-40d9-9cc7-27b12c416abb",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Conduct Quarterly Team Meeting"
    },
    {
        "start_date": "2025-01-07T14:00:00",
        "updatedAt": "2025-01-09T17:02:54.468Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Pending",
        "createdAt": "2025-01-09T17:02:54.468Z",
        "priority": "Medium",
        "due_date": "2025-01-18T12:00:00",
        "description": "Revise the API documentation to reflect the latest changes to endpoints and authentication methods.",
        "id": "716ef902-65ad-4fe7-ab3d-a249d1551b04",
        "completion_date": "",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Update API Documentation"
    },
    {
        "start_date": "2025-01-02T08:00:00",
        "updatedAt": "2025-01-09T17:02:53.675Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Completed",
        "createdAt": "2025-01-09T17:02:53.675Z",
        "priority": "Low",
        "due_date": "2025-01-05T23:59:00",
        "description": "Create the financial report for the month of December 2024, including income, expenses, and projections.",
        "id": "7f97ad59-4b05-43d3-97f0-57e600d1e624",
        "completion_date": "2025-01-04T16:30:00",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Prepare Monthly Report"
    },
    {
        "updatedAt": "2025-01-09T15:59:47.645Z",
        "created_by": "b2050464-40a1-7051-9278-b047fb169c81",
        "status": "Backlog",
        "createdAt": "2025-01-09T15:59:47.645Z",
        "priority": "Medium",
        "due_date": "2025-01-17",
        "description": "Create a new dashboard for the application",
        "id": "0be50d34-254d-416f-bf28-4b5d7a4a4df4",
        "assigned_to": [
            "92a56404-f061-70cb-4899-c16f7e259ed9"
        ],
        "title": "Create New Dashboard"
    },
    {
        "start_date": "2025-01-08T09:30:00",
        "updatedAt": "2025-01-09T16:58:34.764Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Completed",
        "createdAt": "2025-01-09T16:58:34.764Z",
        "priority": "Medium",
        "due_date": "2025-01-08T10:00:00",
        "description": "Prepare and conduct the Q1 performance review with the client, discussing goals and milestones.",
        "id": "cd3131c9-e6a9-4d05-9df7-c64cefbf4168",
        "completion_date": "2025-01-08T11:00:00",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Client Meeting - Q1 Review"
    },
    {
        "start_date": "2025-01-02T08:00:00",
        "updatedAt": "2025-01-09T16:58:33.379Z",
        "created_by": "92a56404-f061-70cb-4899-c16f7e259ed9",
        "status": "Completed",
        "createdAt": "2025-01-09T16:58:33.379Z",
        "priority": "Low",
        "due_date": "2025-01-05T23:59:00",
        "description": "Create the financial report for the month of December 2024, including income, expenses, and projections.",
        "id": "90075786-c0ab-49f8-9e2c-d28b7ea9bcb1",
        "completion_date": "2025-01-04T16:30:00",
        "assigned_to": [
            "b2050464-40a1-7051-9278-b047fb169c81"
        ],
        "title": "Prepare Monthly Report"
    }
]

for (const task of data) {
    console.log(task.title);
    console.log(format(task.createdAt, "h:mm aa"));
    console.log(format(task.createdAt, "io MMM yyyy"));
    console.log(format(task.due_date, "io MMM yyyy"));
}
