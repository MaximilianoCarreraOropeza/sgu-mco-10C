pipeline{
    agent any

    stages {
        // Parar los servicios que ya existen o en todo caso hacer caso omiso
        stage('Parando los servicios...') {
            steps {
                bat '''
                    docker compose -p mco_demo_10_c down || exit /b 0
                '''
            }
        }


// Eliminar las imágenes creadas por ese proyecto
        stage('Eliminando imágenes anteriores...') {
            steps {
                bat '''
                    for /f "tokens=*" %%i in ('docker images --filter "label=com.docker.compose.project=mco_demo_10_c" -q') do (
                        docker rmi -f %%i
                    )
                    if errorlevel 1 (
                        echo No hay imagenes por eliminar
                    ) else (
                        echo Imagenes eliminadas correctamente
                    )
                '''
            }
        }

        // Del recurso SCM configurado en el job, jala el repo
        stage('Obteniendo actualización...') {
            steps {
                checkout scm
            }
        }


        //levantar y desplegar el proyecto
        stage('Construyendo y Desplegando....'){
            steps{
                bat '''
                    docker compose up --build -d 
                '''
            }
        }
    }

    post{
        success{
            echo 'Pipeline ejecutado exitosamente'
        }   
        
        failure{
            echo 'Pipeline fallido'
        }

        always{
            echo 'Ejecucion del pipeline finalizada'
        }
    }
}