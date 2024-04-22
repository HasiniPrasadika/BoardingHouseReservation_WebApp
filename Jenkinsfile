pipeline {
    agent any 
   
    
    stages { 
        stage('Get from Github') {
            steps {
                retry(3) {
                    git branch: 'master', url: 'https://github.com/HasiniPrasadika/BoardingEase_WebApp.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t devopsmadhushani/boarding-ease-app:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'boarding-ease-password', variable: 'boarding-easepass')]) {
                    
                bat'docker login -u devopsmadhushani -p ${boarding-easepass}'
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push devopsmadhushani/boarding-ease-app:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}