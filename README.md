# QuickMend — Cloud-Based Appliance Repair Platform

QuickMend is a web application designed to simplify home appliance repair bookings. Customers can submit repair requests, provide appliance details, upload appliance photos, and track their bookings using a unique Repair ID.

The project demonstrates full-stack web development, AWS cloud services, object storage, database integration, and automated deployment.

## Features

- Appliance repair booking form
- Unique Repair IDs for bookings
- Booking tracking
- Appliance photo uploads
- Cloud-based booking storage
- Automated website deployment through GitHub Actions

## Technology Stack

**Frontend**
- React
- JavaScript
- Vite
- Tailwind CSS

**AWS Cloud Services**
- Amazon EC2 — website hosting
- Nginx — web server
- AWS Lambda — backend processing
- Amazon API Gateway — HTTP API endpoint
- Amazon DynamoDB — booking data storage
- Amazon S3 — website build and appliance photo storage
- AWS Systems Manager — remote deployment commands

**DevOps and Deployment**
- Git and GitHub
- GitHub Actions
- Vercel — separate frontend deployment

## Architecture Overview

1. Customers access the QuickMend website.
2. The frontend sends booking requests to Amazon API Gateway.
3. AWS Lambda processes booking requests.
4. Booking details are stored in Amazon DynamoDB.
5. Appliance photos are stored in Amazon S3.
6. GitHub Actions builds the frontend and automates deployment to the EC2 web server.

## Deployment

The project uses GitHub for source control and GitHub Actions for automated deployment to AWS EC2. The frontend is also deployed separately on Vercel.

## Learning Outcomes

- Deploying a frontend application on AWS
- Integrating a frontend with a serverless API
- Working with NoSQL database storage
- Managing file uploads using object storage
- Automating deployments using CI/CD
- Using Git and GitHub for version control

## Future Improvements

- Authentication and authorization
- Booking status notifications
- Improved monitoring and error handling
- Custom domain and HTTPS configuration
- More comprehensive automated testing

## Project Status

This project is an ongoing learning and portfolio project focused on cloud engineering and DevOps concepts.


## 🏗️ AWS Architecture

QuickMend is a home appliance repair booking and tracking platform built with a React frontend and AWS cloud services.

### Architecture Overview

```text
                    CUSTOMER
                        |
                        v
               QuickMend Frontend
                        |
                        v
                 Amazon API Gateway
                        |
                        v
                   AWS Lambda
                        |
                        v
                Amazon DynamoDB
              (Repair Booking Records)

      Appliance Photos ---> Amazon S3


         CI/CD DEPLOYMENT PIPELINE

              GitHub Repository
                        |
                        v
                 GitHub Actions
                        |
                        v
               Amazon S3 (deploy/)
                        |
                        v
             AWS Systems Manager
                        |
                        v
               Amazon EC2 (Ubuntu)
                        |
                        v
                      Nginx
                        |
                        v
                 Website Hosting
```

### AWS Services Used

| AWS Service | Purpose |
|---|---|
| Amazon EC2 | Hosts the website using an Ubuntu server and Nginx |
| Amazon S3 | Stores appliance photos and deployment build files |
| AWS Lambda | Processes booking and tracking requests |
| Amazon API Gateway | Provides API endpoints for the frontend |
| Amazon DynamoDB | Stores customer repair booking records |
| AWS Systems Manager (SSM) | Runs deployment commands on EC2 |
| GitHub Actions | Automates the build and deployment workflow |

### Key Features

- Customer repair booking
- Repair ID generation and booking tracking
- Appliance photo support
- Cloud-based booking data storage
- Automated website deployment using GitHub Actions
- EC2 and Nginx website hosting

### Cloud Region

**AWS Region:** Asia Pacific (Mumbai) — `ap-south-1`

### Project Goal

The goal of QuickMend is to demonstrate how a web application can integrate frontend development, serverless backend processing, cloud storage, database management, and CI/CD automation using AWS.

