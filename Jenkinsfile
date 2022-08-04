pipeline {
    agent any
    environment {
        PORT_HOST = "4200"
        PORT_CONT = "80"
        IMAGE_TAG = "social_media_angular"
        CONTAINER_NAME = "social_media_angular_container"
    }
    tools {nodejs "nodejs"}
    stages {
        stage('remove existing container') {
            steps {
                sh 'docker stop ${CONTAINER_NAME} || true'
            }
        }
        stage('remove existing image') {
            steps {
                sh 'docker rmi ${IMAGE_TAG} || true'
            }
        }
        stage('npm install') {
            steps {
                sh 'npm install'
            }
        }
        stage('ng build') {
            steps {
                sh 'ng build --configuration=production'
            }
        }
        stage('create image') {
            steps {
                sh 'docker build -t ${IMAGE_TAG} -f Dockerfile .'
            }
        }
        stage('create container') {
            steps {
                sh 'docker run -d --rm -p ${PORT_HOST}:${PORT_CONT} --name ${CONTAINER_NAME} ${IMAGE_TAG}'
            }
        }
    }
}