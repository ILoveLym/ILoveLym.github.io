two.clear()

const BORDER = 360
const STEP = 4

// 绘制 BORDER*BORDER 的网格
for (let i=0; i<=BORDER; i+=STEP) {
	two.makeLine(0 ,i, BORDER, i)
	two.makeLine(i, 0, i, BORDER)
}
two.makeLine(BORDER/2, 0, BORDER/2, BORDER).linewidth = 2
two.makeLine(0, BORDER, BORDER, BORDER).linewidth = 2
two.update()

// 绘制一个点，内部根据 STEP 映射坐标到网格线交点上
function setPoint(x, y) {
	two.makeCircle(x*STEP+BORDER/2, BORDER-y*STEP, 2)
}

const a = 0.05
const div = 0.5 / a
let d_pre = 0.5 - a
let d_post = 1 - a * Math.ceil(div) - 0.25 * a
let x = 0, y = 0


while (x*STEP < BORDER && y*STEP < BORDER) {
	// alert(`Set point at (${x}, ${y})`)
	setPoint(x, y)
	setPoint(-x, y)
	two.update()

	if (x < div) {
		let tmp = -2*a*x - 3*a
		x++
		if (d_pre < 0) {
			y++
			d_pre += tmp + 1
		} else {
			d_pre += tmp
		}
	} else {
		let tmp = -2*a*x - 2*a+1
		y++
		if (d_post >= 0) {
			x++
			d_post += tmp
		} else {
			d_post += 1
		}
	}
}

two.update()