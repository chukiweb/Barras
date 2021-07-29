
    let game = function() {

        let time = 30;
        let movBola = 10;
        let movBarra = 20;


        /* Medidas del tablero */
        let width = document.getElementById("wraper").clientWidth ;
        let heigth = document.getElementById("wraper").clientHeight;

        let controlGame;
        let player1;
        let player2;

        function start() {
            init();
            controlGame = setInterval(play, time);
        }

        function stop() {
            clearInterval(controlGame);
            document.body.style.background = "#f00";
        }

        function play() {
            moverPelota();
            moverBarras();
            checkLost();
            
        }

        function init() {
            bola.style.left = 0;
            bola.state = 1;
            bola.direction = 1 //derecha 1, izquierda 2;

            player1 = new Object();
            player1.KeyPress = false;
            player1.KeyCode = null;

            player2 = new Object();
            player2.KeyPress = false;
            player2.KeyCode = null;

            /* Capturamos los eventos de teclado para mover las barras */


            document.onkeydown = function(evento) {
                /* e = e || window.event; */

                switch (evento.which) {
                    case 81: //Q
                    case 65: //A
                        player1.KeyCode = evento.which;
                        player1.KeyPress = true;
                        break;

                    case 79: //O
                    case 76: //L
                        player2.KeyCode = evento.which;
                        player2.KeyPress = true;
                        break;
                }
            }

            document.onkeyup = function(evento) {
                /* e = e || window.event; */

                if (evento.which == 81 || evento.which == 65) {
                    player1.KeyPress = false;
                }

                if (evento.which == 79 || evento.which == 76) {
                    player2.KeyPress = false;
                }
            }

           
        }

        function checkLost(){
            if (bola.offsetLeft >= width) {
                stop();
            }
            if (bola.offsetLeft <= 0) {
                stop();
            }
        }


        function moverBarras() {
            if (player1.KeyPress) {

                if (player1.KeyCode == 81 && barr1.offsetTop >= 0) {
                    barr1.style.top = (barr1.offsetTop - movBarra) + "px";
                }

                if (player1.KeyCode == 65 && (barr1.offsetTop + barr1.clientHeight) <= heigth) {
                    barr1.style.top = (barr1.offsetTop + movBarra) + "px";
                }
            }
            if (player2.KeyPress) {
                if (player2.KeyCode == 79 && barr2.offsetTop >= 0) {
                    barr2.style.top = (barr2.offsetTop - movBarra) + "px";
                }

                if (player2.KeyCode == 76 && (barr2.offsetTop + barr2.clientHeight) <= heigth) {
                    barr2.style.top = (barr2.offsetTop + movBarra) + "px";
                }
            }
        }

        function moverPelota() {
            /* Comprobamos el estado de la pelota con esta funcion */
            checkStateBall();

            /* Segun el estado controlamos la direccion de la pelota */
            switch (bola.state) {
                case 1://derecha, abajo
                bola.style.left = (bola.offsetLeft + movBola) + "px";
                bola.style.top = (bola.offsetTop + movBola) + "px" ;

                    break;

                case 2://derecha, arriba

                bola.style.left = (bola.offsetLeft + movBola) + "px";
                bola.style.top = (bola.offsetTop - movBola) + "px";
                    break;

                case 3://izquierda, abajo

                bola.style.left = (bola.offsetLeft - movBola) + "px";
                bola.style.top = (bola.offsetTop + movBola) + "px";
                    break;

                case 4://izquierda, arriba

                bola.style.left = (bola.offsetLeft - movBola) + "px";
                bola.style.top = (bola.offsetTop - movBola) + "px";
                    break;
            }
        }

        /* Funcion para comprobar el estado de la pelota en nuestra escena */
        function checkStateBall(){

            /* Comprobacion si la pelota choca con una barra */
            if(collidePlayer2()){
                bola.direction = 2;
                 if (bola.state == 1) bola.state = 3;
                if (bola.state == 2) bola.state = 4;
                    
                
            }
             if(collidePlayer1()){
                bola.direction = 1;
                 if (bola.state == 3) bola.state = 1;
               
            }
 



            if(bola.direction === 1){

                if(bola.offsetTop >= heigth) { bola.state = 2;}

                else if(bola.offsetTop <= 0) {bola.state = 1;}

            }else{

                if(bola.offsetTop >= heigth)  {bola.state = 4;}

                 if(bola.offsetTop <= 0) {bola.state = 3;}
            }
        }

        function collidePlayer1(){
            
            if (bola.offsetLeft <= (barr1.clientWidth) &&
                bola.offsetTop >= barr1.offsetTop &&
                bola.offsetTop <= (barr1.offsetTop + barr1.clientHeight)){
                    return true;
                }
            return false;}


        function collidePlayer2(){
            
            if (bola.offsetLeft >= (width - barr2.clientWidth) &&
                bola.offsetTop >= barr2.offsetTop &&
                bola.offsetTop <= (barr2.offsetTop + barr2.clientHeight)){
                    return true;
                }
                
            
            return false;}

        start();

    }();
