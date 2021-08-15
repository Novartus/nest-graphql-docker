pipeline {
    agent {label 'linux'}
    environment {
        DB_HOST = "${env.DB_HOST}"
        DB_USER = "${env.DB_USER}"
        DB_PASS = "${env.DB_PASS}"
        DB_NAME = "${env.DB_NAME}"
        DB_PORT = "${env.DB_PORT}"
        MYSQL_ROOT_PASSWORD = "${env.DB_PASS}"
        MYSQL_DATABASE = "${env.DB_NAME}"
    }
    stages {
        stage("Build and Test") {
            steps {
                script{
                    if (env.BRANCH_NAME.startsWith('PR')) {
                    hangoutsNotify message: "A new PR has been found",token: env.hangout_token,threadByJob: false
                    }else if (env.BRANCH_NAME == 'master'){
                    echo 'Running Docker Compose Build'
                    sh "sudo docker-compose build --force-rm --no-cache development"
                    echo 'Running Docker Compose Test Cases'
                    sh "sudo docker-compose run development npm run test"
                }
            }
        }
        stage("New PR Check"){
            when{
                branch 'PR-*'
            }
            steps {
                hangoutsNotify message: "Testing the PR",token: env.hangout_token,threadByJob: false
                echo 'Running Docker Compose Build'
                sh "sudo docker-compose build --force-rm --no-cache testing"
                sh "sudo docker-compose run testing npm run test"
                echo 'PR was a success!'
            }
        }
    }

    post {
      always {
            echo 'Pipeline Completed !'
      }

      success {
          script{
              echo 'PR Pipeline was Success !'
              if (env.BRANCH_NAME == 'master') {
                hangoutsNotify message: "Current running build has been stopped for the new build",token: env.hangout_token,threadByJob: false
                sh "sudo docker-compose stop development || true"
                hangoutsNotify message: "Master Build has been started",token: env.hangout_token,threadByJob: false
                echo 'Starting build....'
                sh "sudo docker-compose up -d development"
                hangoutsNotify message: "Master branch Build was a success and live now !",token: env.hangout_token,threadByJob: false
                sh "sudo docker image prune -f --filter label=stage=tester"
              } else if (env.BRANCH_NAME.startsWith('PR')) {
                sh "sudo docker-compose stop testing || true"
                hangoutsNotify message: "PR request : \n${env.BRANCH_NAME} was a success",token: env.hangout_token,threadByJob: false
              } else {
                hangoutsNotify message: "Build of ${env.BRANCH_NAME} was a success",token: env.hangout_token,threadByJob: false
              }
          }
      }

      failure {
          script{
              echo 'Pipeline was failure !'
              if (env.BRANCH_NAME == 'master') {
                hangoutsNotify message: "Master branch Build was a failure \n Can not create a new build from latest commit",token: env.hangout_token,threadByJob: false
              } else if (env.BRANCH_NAME.startsWith('PR')) {
                hangoutsNotify message: "PR request : \n${env.BRANCH_NAME} was a failure",token: env.hangout_token,threadByJob: false
                sh "sudo docker-compose stop testing || true"
              } else {
                hangoutsNotify message: "Build of \n${env.BRANCH_NAME} was a failure",token: env.hangout_token,threadByJob: false
              }
              echo 'Taking Down Docker Compose on failure'
              sh "sudo docker-compose stop testing || true"
          }
      }
    }
}