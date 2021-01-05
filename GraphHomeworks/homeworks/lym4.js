two.clear()

const BORDER = 360
const STEP = 4

// 绘制 BORDER*BORDER 的网格
for (let i=0; i<=BORDER; i+=STEP) {
	two.makeLine(0 ,i, BORDER, i)
	two.makeLine(i, 0, i, BORDER)
}
two.update()

// 绘制一个点，内部根据 STEP 映射坐标到网格线交点上
function setPoint(x, y, color='white') {
	two.makeCircle(x*STEP, y*STEP, 2).fill = color
}

// 用中点 Bresenham 算法绘制一条线
function drawLine(x1, y1, x2, y2, color) {
	const k = (y2 - y1) / (x2 - x1)
	const factor = k / Math.abs(k)
	
	if (x2 == x1) {
		let y_min = Math.min(y1, y2)
		let y_max = Math.max(y1, y2)
		for (let y=y_min; y<=y_max; y++) {
			setPoint(x1, y, color)
		}
		return
	}

	if (x1 > x2) {
		[x1, y1, x2, y2] = [x2, y2, x1, y1]
	}

	setPoint(x1, y1, color)
	setPoint(x2, y2, color)

	if (Math.abs(k) < 1) {
		let d = 0.5 - k
		while (x1 <= x2) {
			setPoint(x1, y1)
			two.update()

			x1 += 1
			if (d <= 0) {
				y1 += factor
				d = d + 1 - k
			} else {
				d = d - k
			}
		}
	} else {
		let d = 1 - 0.5*k
		while (y1 != y2) {
			setPoint(x1, y1, color)
			two.update()

			y1 += factor
			if (d < 0) {
				d = d + 1
			} else {
				x1 += 1
				d = d + 1 - k
			}
		}
	}
}

// 直线对象
function Line(x1, y1, x2, y2) {
	this.x1 = Math.max(x1, x2)
	this.x2 = Math.min(x1, x2)
	this.y1 = Math.max(y1, y2)
	this.y2 = Math.min(y1, y2)
	this.code1 = this.calculate_code(
		this.x1, this.y1
	)
	this.code2 = this.calculate_code(
		this.x2, this.y2
	)
}
Line.prototype.draw = function (color='white') {
	drawLine(this.x1, this.y1, this.x2, this.y2, color)
}
Line.prototype.calculate_code = function (x, y) {
	let result = 0
	if (x < this.wxl) result |= 1
	if (x > this.wxr) result |= 2
	if (y < this.wyb) result |= 4
	if (y > this.wyt) result |= 8
	return result
}

alert('绘制窗口')
wyt = Line.prototype.wyt = 60
wyb = Line.prototype.wyb = 40
wxl = Line.prototype.wxl = 20
wxr = Line.prototype.wxr = 70
for (let x=wxl; x<=wxr; x++) {
	for (let y=wyb; y <= wyt; y++) {
		setPoint(x, y)
	}
}
two.update()

alert('开始画线')
// let p1_x = 30, p1_y = 30
// let p2_x = 30, p2_y = 70
const stack = []
let line = new Line(20, 30, 40, 70)
line.draw('gray')
two.update()

alert('开始处理')
;(function handle(line) {
	if ((line.code1 | line.code2) == 0) {
		alert(`选中了 ${line.x1}, ${line.y1}  ->  ${line.x2}, ${line.y2}`)
		line.draw('black')
	} else if ((line.code1 & line.code2) != 0) {
		alert(`丢弃了 ${line.x1}, ${line.y1}  ->  ${line.x2}, ${line.y2}`)
		alert(`code1=${line.code1}, code2=${line.code2}`)
	} else {
		alert(`切分了 ${line.x1}, ${line.y1}  ->  ${line.x2}, ${line.y2}`)
		if (Math.abs(line.x1 - line.x2) > 1 || Math.abs(line.y1 - line.y2) > 1) {			
			let m_x = Math.floor((line.x1 + line.x2) / 2)
			let m_y = Math.floor((line.y1 + line.y2) / 2)
			stack.push(new Line(line.x1, line.y1, m_x, m_y))
			stack.push(new Line(line.x2, line.y2, m_x, m_y))
		}
	}
	if (stack.length) handle(stack.pop())
})(line)

two.update()