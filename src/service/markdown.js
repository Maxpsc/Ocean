import markdown from 'markdown-it';

export default function(text){
    if(text){
        return markdown().render(text);
    }else{
        return 'rendering~~';
    }
 };
