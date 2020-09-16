export class userDetail {


    constructor(pipeString) {
        var splittedPipe = String(pipeString).split("|");
        this.uuid = splittedPipe[0];
        this.email = splittedPipe[1];
        this.androidToken = splittedPipe[2];
        this.webToken = splittedPipe[3];

    }

    guuid() {
        return this.uuid;
    }



    gemail() {
        return this.email;
    }



    gandroidToken() {
        return this.androidToken;
    }



    gwebToken() {
        return this.webToken;
    }


}