# Serfee API

This is a backend API for Serfee Application using Node.js and Express Deployed on App Engine. The API seamlessly integrates with Google Cloud Platform (GCP) services, including Cloud SQL and Cloud Storage.
You can access the API Endpoint link at https://serfee-project.as.r.appspot.com

## Installation & Environment Variables

> **_All operation methods require this step._**

To run this project, you will need to install the dependencies, create the configuration file called cloud-storage.json & firebase.json and add the following environment variables to your .env file

#### Install dependencies

```bash
  npm install
```

#### cloud-storage.json & firebase.json

```env
{
  "type": "xxxx",
  "project_id": "xxxx",
  "private_key_id": "xxxx",
  "private_key": "xxxx",
  "client_email": "xxxx",
  "client_id": "xxxx",
  "auth_uri": "xxxx",
  "token_uri": "xxxx",
  "auth_provider_x509_cert_url": "xxxx",
  "client_x509_cert_url": "xxxx",
  "universe_domain": "xxxx"
}
```

you need to create cloud-storage.json & firebase.json inside the credentials folder. to get the credentials you need to set up the Firebase and GCP project and create the credentials key.

#### .env

| Name          | Variable                                                                          |
| :------------ | :-------------------------------------------------------------------------------- |
| PORT          | `PORT`                                                                            |
| MySQL         | `DB_HOST` `DB_USERNAME` `DB_PASSWORD` `DB_NAME`                                   |
| Cloud Storage | `CS_PROJECT_ID` `CS_BUCKET_NAME`                                                  |
| Firebase      | `FIREBASE_DB_URL` `FIREBASE_API_KEY` `FIREBASE_AUTH_DOMAIN` `FIREBASE_PROJECT_ID` |

- `PORT`: Set your server to listening to `PORT` you specify in here
- `DB_HOST`: set your Database IP Address
- `DB_USERNAME`: set your database username
- `DB_PASSWORD`: set your database password
- `DB_NAME`: set your database name
- `CS_PROJECT_ID`: set your GCP project ID
- `CS_BUCKET_NAME`: set your Cloud Storage bucket name
- `FIREBASE_DB_URL`: set your Firebase realtime database URL
- `FIREBASE_API_KEY`: set your Firebase API key got in Account Settings in Firebase Console
- `FIREBASE_AUTH_DOMAIN`: set your Firebase Auth Domain got in Account Settings in Firebase Console
- `FIREBASE_PROJECT_ID`: set your Firebase or GCP Project ID

You can see the example of .env file in env.example file

## 🏃‍♂️ Run Local

After you install the dependencies and set the environment variables, you can start the server by running

```bash
  npm run start
```

## API Reference💡

#### Request Task

This API endpoint will create a requested task and need authorization before continuing to create a request task.

```http
  POST /api/tasks/request
```

| name          | Element | Value             |
| :------------ | :------ | :---------------- |
| authorization | Headers | `Bearer ${token}` |
| photo         | body    | `image`           |
| title         | body    | `text`            |
| category      | body    | `text`            |
| Description   | body    | `text`            |
| lat           | body    | `task_latitude`   |
| lon           | body    | `task_longitude`  |

Input example
```
curl --location 'https://serfee-project.as.r.appspot.com/tasks/request' \
--header 'Authorization: ${token}' \
--form 'photo=@"/D:/1a PRESUNIV/luf.png"' \
--form 'title="buy me"' \
--form 'category="Cleaning"' \
--form 'description="help me buy some cofeee"' \
--form 'lat="-6.216840066573826"' \
--form 'lon="107.1517113558033"'
```

Output example

```bash
{
    "message": "Create new task success",
    "creator_id": 2,
    "data": {
        "title": "buy me",
        "category": "Cleaning",
        "description": "help me buy some cofeee",
        "lat": "-6.216840066573826",
        "lon": "107.1517113558033"
    },
    "image_url": "https://storage.googleapis.com/serfee/images/task/1686911412980"
}
```

#### Get near task

This API endpoint will need the authorization, latitude and longitude from user location to get all near tasks by user location. radius will filters the tasks in radius km.

```http
  GET /api/tasks/response
```

| name          | Element | Value             |
| :------------ | :------ | :---------------- |
| authorization | Headers | `Bearer ${token}` |
| lat           | body    | `user_latitude`   |
| lon           | body    | `user_longitude`  |
| radius        | body    | `int`             |


Input example
```
curl --location --request GET 'http://192.168.1.6:8080/tasks/response' \
--header 'Authorization: ${token}' \
--data '{
    "latitude": -6.21684,
    "longitude": 107.152,
    "radius": 1
}'
```

Output example

```bash
{
  "message": "GET all near tasks",
  "data": [
    {
      "request_id": 94,
      "user_id": 2,
      "title": "buy me",
      "category_id": 1,
      "description": "help me buy some cofeee",
      "price": null,
      "location_latitude": -6.2168402671813965,
      "location_longitude": 107.1517105102539,
      "image_url": "https://storage.googleapis.com/serfee/images/task/1686911412980",
      "status": "Active",
      "created_at": "2023-06-16T03:30:13.000Z"
    }
  ],
  "distance": 32
}
```
the response will give the distance between the tasker and tasks position

## Deployment

This app utilizes CI/CD pipelines using GitHub Actions to automate deployment to App Engine. If you want to deploy this app to App Engine, you just need pushed your changes into branch main in Github Repository. But before doing you need to set the configuration as below.

- Ensure that your application code is ready for deployment and that you have a working GitHub repository for it.
- Create a `deploy.yaml` file in the .github/workflows/ directory of your repository.
- The `deploy.yaml` file sets up a deployment workflow triggered by pushes to the main branch. You can modify the `deploy.yaml` file as you needed
- In your GitHub repository, navigate to `Settings` and then `Secrets`. Add the required secrets:

  - `GCLOUD_PROJECT`: Your Google Cloud project ID

  - `APPLICATION_CREDENTIALS`: Contents of your Google Cloud service account key JSON file

  - `ENV_FILE`: Contents of your .env file

  - `CLOUD_STORAGE_CONFIG`: Contents related to your Cloud Storage service account key JSON file

  - `FIREBASE_CONFIG`: Contents related to your Firebase service account key JSON file

- Push your code changes to the `main` branch and it will automate deployment process into App Engine in GCP

## Documentation

[API Documentation](https://documenter.getpostman.com/view/27408376/2s93m32iF1)

## Authors

- [@manansaipi](https://www.github.com/manansaipi)
- [@siburianbasrunki](https://www.github.com/siburianbasrunki)
