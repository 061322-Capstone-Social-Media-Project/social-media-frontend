

export class Likes {
    id: number;
    userId: number;
    postId: number;

    constructor(id: number,user_id: number, post_id: number){
        this.id = id;
        this.userId = user_id;
        this.postId = post_id;

    }


}
