function basepath(orig_url){
    return `${process.env.NEXT_PUBLIC_BASEPATH || ""}${orig_url}`
}

export class navigate {
    static push(url){
        window.location.assign(basepath(url))
    }

    static replace(url){
        window.location.replace(basepath(url))
    }

    static back(){
        window.history.back();
    }
}

export default basepath;