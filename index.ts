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
const colors : Array<string> = [
    "#f44336",
    "#01579B",
    "#FFAB00",
    "#00C853",
    "#880E4F"
]

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

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }
    static drawLineRotCatch(context : CanvasRenderingContext2D, scale : number) {
        const gap : number = w / lines 
        const sf : number = ScaleUtil.sinify(scale)
        context.save()
        context.translate(0, h / 2)
        for (var j = 0; j < lines; j++) {
            const sfj : number = ScaleUtil.divideScale(sf, j, lines)
            const sfj1 : number = ScaleUtil.divideScale(sfj, 0, parts)
            const sfj2 : number = ScaleUtil.divideScale(sfj, 1, parts)
            const sfj3 : number = ScaleUtil.divideScale(sfj, 2, parts)
            context.save()
            context.translate(gap * (j +1), 0)
            context.save()
            context.rotate(deg * (sfj2 - 1))
            DrawingUtil.drawLine(context, 0, 0, -gap * sfj1, 0)
            context.restore()
            context.save()
            context.translate(0, -(h / 2 + gap) * (1 - sfj3))
            context.fillRect(-gap, 0, gap, gap)
            context.restore()
            context.restore()
        }
        context.restore()
    }
    
    static drawLRCNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawLineRotCatch(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h) 
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}