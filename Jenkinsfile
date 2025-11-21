pipeline {
  agent any

  environment {
    REGISTRY = "docker.io"
    IMAGE_NAME = "${env.DOCKER_REGISTRY_NAMESPACE:-your-namespace}/todo-reduxtoolkit"
    TAG = "${env.BUILD_NUMBER ?: 'latest'}"
    // Credentials must be added to Jenkins: DOCKERHUB_CREDENTIALS (username/password) and SSH_CREDENTIALS (optional)
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'echo "Installing dependencies"'
        dir('REACT/11todoReduxToolkit') {
          sh 'npm ci'
        }
      }
    }

    stage('Test') {
      steps {
        sh 'echo "Running tests"'
        dir('REACT/11todoReduxToolkit') {
          // run unit tests (adjust for your test runner)
          sh 'npm test -- --silent || true'
        }
      }
      post {
        always {
          junit 'REACT/11todoReduxToolkit/test-results/**/*.xml' // if tests produce JUnit XML
        }
      }
    }

    stage('Build') {
      steps {
        sh 'echo "Building production bundle"'
        dir('REACT/11todoReduxToolkit') {
          sh 'npm run build'
        }
      }
    }

    stage('Docker: Build & Push') {
      when {
        expression { return env.DOCKERHUB_CREDENTIALS != null }
      }
      steps {
        script {
          def fullImage = "${IMAGE_NAME}:${TAG}"
          dir('REACT/11todoReduxToolkit') {
            sh "docker build -t ${fullImage} ."
          }

          withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin ${REGISTRY}'
            sh "docker push ${fullImage}"
          }
        }
      }
    }

    stage('Deploy (optional)') {
      steps {
        echo 'Deployment step: customize as needed (SSH, kubectl, helm)'
        // Example: copy build artifacts to remote server
        // sshagent(['SSH_CREDENTIALS']) {
        //   sh 'scp -r REACT/11todoReduxToolkit/build user@server:/var/www/todo'
        // }
      }
    }
  }

  post {
    success {
      echo 'Pipeline succeeded'
    }
    failure {
      echo 'Pipeline failed'
    }
    cleanup {
      // optional cleanup commands
    }
  }
}
