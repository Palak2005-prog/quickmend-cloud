# QuickMend — Cloud-Based Appliance Repair Platform

QuickMend is a web application for booking and tracking home appliance repair services. This project demonstrates how a React application can be deployed and integrated with AWS cloud services.

## Features

- Book appliance repair services online
- Generate a unique booking ID
- Track repair bookings and status
- Upload appliance photos using Amazon S3
- Store booking records in Amazon DynamoDB
- Automatically deploy website updates using GitHub Actions

## AWS Architecture

- **Amazon EC2:** Hosts the website.
- **Nginx:** Serves the production website.
- **AWS Systems Manager:** Runs deployment commands on EC2.
- **Amazon API Gateway:** Receives API requests.
- **AWS Lambda:** Processes booking, tracking, and upload requests.
- **Amazon DynamoDB:** Stores booking information.
- **Amazon S3:** Stores website build files and supports appliance photo uploads.
- **AWS IAM:** Controls access to AWS resources.
- **GitHub Actions:** Automates the build and deployment workflow.

## Technology Stack

- React
- JavaScript
- Vite
- AWS
- Python (AWS Lambda)
- Git and GitHub
- GitHub Actions
- Nginx

## Deployment Workflow

1. Code is pushed to the `main` branch on GitHub.
2. GitHub Actions installs dependencies and builds the React application.
3. The generated website files are uploaded to an S3 deployment prefix.
4. AWS Systems Manager runs the deployment commands on EC2.
5. Nginx serves the updated website.

## Learning Objectives

This project provides hands-on practice with cloud hosting, serverless APIs, database integration, IAM permissions, object storage, and CI/CD automation.

## Security Notes

- AWS credentials must be stored in GitHub Actions secrets, never committed to the repository.
- IAM permissions should follow the principle of least privilege.
- The public demonstration currently uses HTTP. Do not submit sensitive personal information through the demo until HTTPS is configured.

## Future Improvements

- Configure HTTPS
- Improve API validation and error handling
- Add monitoring and cost controls
- Improve production security

---

**Project:** QuickMend  
**Purpose:** AWS cloud engineering portfolio project

## Architecture Diagram

```mermaid
flowchart TD
    A[Customer Browser] --> B[QuickMend Website]
    B --> C[Amazon EC2 + Nginx]
    B --> D[Amazon API Gateway]
    D --> E[AWS Lambda]
    E --> F[(Amazon DynamoDB)]
    E --> G[Amazon S3]

    H[GitHub Repository] --> I[GitHub Actions]
    I --> J[Amazon S3 Deployment Files]
    J --> K[AWS Systems Manager]
    K --> C
