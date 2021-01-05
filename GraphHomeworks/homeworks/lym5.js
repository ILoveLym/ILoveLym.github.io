two.clear()

const point_a = [100, 180]
const point_b = [260, 180]

function setPont(x, y, color='white') {
	two.makeCircle(x, y, 4).fill = color
}

function setLine(x1, y1, x2, y2) {
	two.makeLine(x1, y1, x2, y2)
}

function set2PointPerspectiveLine(x1, y1, x2, y2) {
	setLine(x1, y1, x2, y2)
	setLine(x1, y1, ...point_a)
	setLine(x1, y1, ...point_b)
	setLine(x2, y2, ...point_a)
	setLine(x2, y2, ...point_b)
}

setPont(...point_a)
setPont(...point_b)
set2PointPerspectiveLine(130, 200, 130, 300)
set2PointPerspectiveLine(120, 100, 120, 170)

two.update()