two.clear()

const BORDER = 360
const STEP = 4

// 制作 BORDER*BORDER 的网格对象
// 0 表示空，1 表示填充， 2 表示边界
const board = Array(BORDER/STEP+1)
for (let i=0; i<=BORDER/STEP; i++) {
	board[i] = Array(BORDER/STEP+1).fill(0)
}

// 绘制 BORDER*BORDER 的网格
for (let i=0; i<=BORDER; i+=STEP) {
	two.makeLine(0 ,i, BORDER, i)
	two.makeLine(i, 0, i, BORDER)
}
two.update()

// 绘制一个点，内部根据 STEP 映射坐标到网格线交点上
function setPoint(x, y) {
	two.makeCircle(x*STEP, y*STEP, 2)
}

// 用中点 Bresenham 算法绘制一条线，并置 board 对应的位置为2
function drawLine(x1, y1, x2, y2) {
	const k = (y2 - y1) / (x2 - x1)
	const factor = k / Math.abs(k)
	
	if (x1 > x2) {
		[x1, y1, x2, y2] = [x2, y2, x1, y1]
	}

	setPoint(x1, y1)
	board[x1][y1] = 2
	setPoint(x2, y2)
	board[x2][y2] = 2

	if (Math.abs(k) < 1) {
		let d = 0.5 - k
		while (x1 <= x2) {
			setPoint(x1, y1)
			two.update()
			board[x1][y1] = 2

			// alert(`${x1}, ${y1}`)
			// alert(`${board[x1]}`)
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
			setPoint(x1, y1)
			two.update()
			board[x1][y1] = 2

			// alert(`${x1}, ${y1}`)
			// alert(`${board[y1]}`)
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

drawLine(45, 20, 25, 40)
drawLine(25, 40, 45, 60)
drawLine(45, 60, 65, 40)
drawLine(65, 40, 45, 20)
two.update()

alert('填充封闭区域')
let x = 45, y = 30
const stack = []
stack.push([x, y])

while (stack.length) {
	[x, y] = stack.pop()
	setPoint(x, y)
	board[x][y] = 1
	two.update()
	alert(`填充了 (${x}, ${y})`)
	if (! board[x-1][y]) stack.push([x-1, y])
	if (! board[x+1][y]) stack.push([x+1, y])
	if (! board[x][y-1]) stack.push([x, y-1])
	if (! board[x][y+1]) stack.push([x, y+1])
}

two.update()