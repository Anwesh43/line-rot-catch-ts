const w : number = window.innerWidth * 0.9 
const h : number = window.innerHeight * 0.9 
const parts : number = 3 
const lines : number = 5 
const scGap : number = 0.02 / (parts * lines)
const strokeFactor : number = 90 
const sizeFactor : number = 3.9 
const delay : number = 20 
const backColor : string = "#BDBDBD"
const deg : number = Math.PI / 4 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    } 

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}