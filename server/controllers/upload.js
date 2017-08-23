import { packJSON } from './base';

class Upload{
    constructor(){

    }
    uploadAvatar(req,res,next){
        console.log(req.file);
        const filename = req.file.filename;
        res.send(packJSON({
            filename: filename
        }));
    }
}
export default new Upload();
