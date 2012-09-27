Cannon.registerPackage('Math');

/**
A simple mathematical matrix
*/
Cannon.Math.Matrix = Cannon.ClassFactory.extend({
	/**
	Creates a new matrix
	@contructor
	@param (Number) a
	@param (Number) b
	@param (Number) c
	@param (Number) d
	@param (Number) tx
	@param (Number) ty
	*/
	__construct: function(a, b, c, d, tx, ty)
	{
		this.a = (a || 1);
		this.b = (b || 0);
		this.c = (c || 0);
		this.d = (d || 1);
		this.tx = (tx || 0);
		this.ty = (ty || 0);
	},
	/**
	Applies the matric to a given context, combining it with thecurrent modifications
	@param (CanvasRenderingContext) ctx
	*/
	apply: function(ctx)
	{
		ctx.transform(this.a, this.b, this.c, this.d, this.tx, this.ty);
	},
	/**
	Applies the current matrix to the context, ovveriding all current context settings
	@param (CanvasRenderingContext) ctx
	*/
	override: function(ctx)
	{
		ctx.setTransform(this.a, this.b, this.c, this.d, this.tx, this.ty);
	},
	/**
	Clones the current matrix
	@type Matrix
	@return A new matrix
	*/
	clone: function()
	{
		return new Cannon.Math.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
	},
	/**
	Multiplies the current matrix by another one, effectively combining theire effect
	@param (Matrix) m2
	*/
	multiply: function(m2)
	{
		var a = this.a;
		var b = this.b;
		var c = this.c;
		var d = this.d;
		var tx = this.tx;
		var ty = this.ty;

		this.a = a*m2.a+b*m2.c;
		this.b = a*m2.b+b*m2.d;
		this.c = c*m2.a+d*m2.c;
		this.d = c*m2.b+d*m2.d;
		this.tx = tx*m2.a+ty*m2.c+m2.tx;
		this.ty = tx*m2.b+ty*m2.d+m2.ty;
	},
	/**
	Resets the matrix so that it will have no effect
	*/
	identity: function()
	{
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	},
	/**
	Inverts the current effect of the matrix
	*/
	invert: function()
	{
		var a = this.a;
		var b = this.b;
		var c = this.c;
		var d = this.d;
		var tx = this.tx;
		var ty = this.ty;

		this.a = d/(a*d-b*c);
		this.b = -b/(a*d-b*c);
		this.c = -c/(a*d-b*c);
		this.d = a/(a*d-b*c);
		this.tx = (c*ty-d*tx)/(a*d-b*c);
		this.ty = -(a*ty-b*tx)/(a*d-b*c);
	},
	/**
	Rotates the matrix
	@param (radians) angle
	*/
	rotate: function(angle)
	{
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
		var a = this.a;
		var b = this.b;
		var c = this.c;
		var d = this.d;
		var tx = this.tx;
		var ty = this.ty;
		
		this.a = a*cos-b*sin;
		this.b = a*sin+b*cos;
		this.c = c*cos-d*sin;
		this.d = c*sin+d*cos;
		//this.tx = tx*cos-ty*sin;
		//this.ty = tx*sin+ty*cos;
	},
	/**
	Scales the matrix
	@param (Number) sx X-Scale
	@param (Number) sy Y-Scale
	*/
	scale: function(sx, sy)
	{
		this.a *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	},
	/**
	Applies a translation to the matrix
	@param (Number) tx X translation
	@param (Number) ty Y translation
	*/
	translate: function(tx, ty)
	{
		this.tx += tx;
		this.ty += ty;
	},
	/**
	Returns a string representation of the matrix
	@type String
	*/
	toString: function()
	{
		return '[a: '+this.a+', b: '+this.b+', c:'+this.c+', d: '+this.d+', tx: '+this.tx+', ty: '+this.ty+']';
	}
});

/**
A point with x and y properties
*/
Cannon.Math.Point2D = Cannon.ClassFactory.extend({
	/**
	@constructor
	@param (Number) x
	@param (Number) y
	*/
	__construct: function(x, y)
	{
		this.x = (x || 0);
		this.y = (y || 0);
	},
	/**
	Computes the length from (0,0) to tthis point
	@type Number
	*/
	length: function()
	{
		return (Math.sqrt((this.x*this.x) + (this.y*this.y)));
	},
	/**
	Clones the current point
	@type Point2D
	*/
	clone: function()
	{
		return new Cannon.Math.Point2D(this.x, this.y);
	},
	/**
	Adds the coordinates of another point to the coordinates of this point to create a new point
	@param (Point2D) p
	@type (Point2D)
	*/
	add: function(p){
		if (Cannon.Utils.instanceOf(p, Cannon.Math.Point2D))
		{
			return new Cannon.Math.Point2D(this.x+p.x, this.y+p.y);
		}
	},
	/**
	 Subtracts the coordinates of another point from the coordinates of this point to create a new point
	@param (Point2D) p
	@type (Point2D)
	*/
	substract: function(p){
		if (Cannon.Utils.instanceOf(p, Cannon.Math.Point2D))
		{
			return new Cannon.Math.Point2D(this.x-p.x, this.y-p.y);
		}
	},
	/**
	Determines whether two points are equal
	@param (Point2D) p
	@type Boolean
	*/
	equals: function(toCompare){
		return (this.x == toCompare.x && this.y == toCompare.y);
	},
	/**
	Offsets the Point object by the specified amount.
	@param (Number) dx X offset
	@param (Number) dy Y offset
	*/
	offset: function(dx, dy){
		this.x += dx;
		this.y += dy;
	},
	/**
	Returns a string representation of the point
	@type String
	*/
	toString: function(){
		return '(x='+this.x+', y='+this.y+')';
	}
});

//statisc methods
/**
Determines a point between two specified points.
@type Point2D
*/
Cannon.Math.Point2D.interpolate = function(p1, p2, f)
{
	f = f || .5;
	var p = new Cannon.Math.Point2D();
	if (Cannon.Utils.instanceOf(p1, Cannon.Math.Point2D) && Cannon.Utils.instanceOf(p2, Cannon.Math.Point2D))
	{
		var f = (parseFloat(f) || 0.5);
		p.x = (p1.x+p2.x)*f;
		p.y = (p1.y+p2.y)*f;
	}
	else Cannon.Logger.log('Cannon.Math.Point2D::interpolate expects first 2 arguments to be instances of Cannon.Math.Point2D');
	
	return p;
}
/**
Converts a pair of polar coordinates to a Cartesian point coordinate
@type Point2D
*/
Cannon.Math.Point2D.polar = function(length, angle)
{
	var p = new Cannon.Math.Point2D();
	length = (length || 0);
	angle = (angle || 0);
	p.x = length*Math.cos(angle);
	p.y = length*Math.sin(angle);
	return p;
}

/**
A vertex class used for geometrical shapes. Has x and y properties as well as 2 control points 
*/
Cannon.Math.Vertex2D = Cannon.Math.Point2D.extend({
	/**
	This constructor accepts both numbers and Point2D as parameters. 
	You can define up to 3 points, each one either as a Point2D or as 2 arguments defining x and y.
	The 3 points are respectively x and y coodinates of the vertex, its first control point and itssecond control points.
	Control points are optionnal, if none is defined, using the vertex in a shape will result in a straight line. If only one is prvided, the second will take the same value.
	@constructor
	*/
	__construct: function()
	{
		this._super(false);
		//main point
		var p = this.__processPoint(arguments[0], arguments[0], arguments[1]);
		if (p){
			this.x = p.x;
			this.y = p.y;
		}
		else
		{
			this.x = 0;
			this.y = 0;
			Cannon.Logger.log('Unable to process Cannon.Vertex constructor arguments, used (0, 0) instead', Cannon.Logger.Warning);
		}
		
		//control point 1
		var cp1 = this.__processPoint(arguments[1], arguments[2], arguments[3]);
		if (cp1)
		{
			this.cp1x = cp1.x;
			this.cp1y = cp1.y;
		}
		else 
		{
			this.cp1x = this.x;
			this.cp1y = this.y;
		}
		
		//control point 2
		var cp2 = this.__processPoint(arguments[2], arguments[4], arguments[5]);
		if (cp2) 
		{
			this.cp2x = cp2.x;
			this.cp2y = cp2.y;
		}
		else
		{
			this.cp2x = this.cp1x;
			this.cp2y = this.cp1y;
		}
	},
	__processPoint: function(point, x, y){
		//returns an object because we dont need all the methods asssociated with Point2D
		if (Cannon.Utils.instanceOf(point, Cannon.Math.Point2D) || (point && point.x && point.y))
		{
			return {x: point.x, y: point.y};
		}
		else if (Cannon.Utils.isNumber(x) && Cannon.Utils.isNumber(y))
		{
			return {x: x, y: y};
		}
		else
		{
			return false;
		}
	},
	/**
	Converts the vertex into an array [cp1x, cp1y, cp2x, cp2y, x, y] that can be used with bezierCurveTo
	*/
	toArray: function(prev)
	{
		return [this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y];
	},
	toString: function()
	{
		return '['+this.cp1x+', '+this.cp1y+', '+this.cp2x+', '+this.cp2y+', '+this.x+', '+this.y+']';
	}
});

/**
Represents a 2D vector
*/
Cannon.Math.Vector2D = Cannon.ClassFactory.extend({
	/**
	@constructor
	@param (Number) x
	@param (Number) y
	*/
	__construct: function(x, y)
	{
		this.x = x;
		this.y = y;
	},
	/**
	Clones thecurrent vector
	@type Vector2D
	@return A new vector
	*/
	clone: function()
	{
		return new Cannon.Math.Vector2D(this.x, this.y);
	},
	/**
	Adds 2 vectors tpgether to return a new one
	@param (Vector2D) v2
	@type Vector2D
	@return A new vector
	*/
	add: function(v2)
	{
		return new Cannon.Math.Vector2D(this.x+v2.x, this.y+v2.y);
	},
	/**
	Substracts a vector from another
	@param (Vector2D) v2
	@type Vector2D
	@return A new vector
	*/
	substract: function(v2)
	{
		return new Cannon.Math.Vector2D(this.x-v2.x, this.y-v2.y);
	},
	/**
	Returns the right normal of the current vector
	@type Vector2D
	@return A new vector
	*/
	rightNormal: function()
	{
		return new Cannon.Math.Vector2D( this.y * -1, this.x);
	},
	/**
	Returns a bector representing the direction of the current vector
	@type Vector2D
	@return A new vector
	*/
	dir: function()
	{
		var v = this.clone();
		v.normalize();
		return v;
	},
	/**
	Projects this onto v2
	@param (Vector2D) v2
	@type Vector2D
	@return A new vector
	*/
	proj: function(v2)
	{
		var den = v2.dotProduct(v2);
		if( den == 0)
		{
			Cannon.Logger.log('Vector2D.proj was called with a 0 length vector', Cannon.Logger.Warning);
			var v = this.clone();
		}
		else
		{
			var v = v2.clone();
			v.multiply(this.dotProduct(v2)/den);
		}
	
		return v;
	},
	/**
	Retuns the projection length of this and v2
	@param (Vector2D) v2
	@type Number
	*/
	projLength: function(v2)
	{
		var den = v2.dotProduct(v2);
		if( den == 0)
		{
			Cannon.Logger.log('Vector2D.projLength was called with a 0 length vector', Cannon.Logger.Warning);
			return 0;
		}
		else
		{
			return Math.abs(this.dotProduct(v2)/den);
		}
	},
	/**
	Computes the dot product of this and v2
	@param (Vector2D) v2
	@type Number
	*/
	dotProduct: function(v2)
	{
		return ((this.x * v2.x) + (this.y * v2.y));
	},
	/**
	Computes the cross product of this and v2
	@param (Vector2D) v2
	@type Number
	*/
	crossProduct: function(v2)
	{
		return ((this.x * v2.y) - (this.y * v2.x));
	},
	/**
	Computes the length of the current vector
	@type Number
	*/
	length: function()
	{
		return (Math.sqrt((this.x*this.x) + (this.y*this.y)));
	},
	/**
	Multiplies the current vector by a given value
	@param (Number) number The value to multiply the vector by
	*/
	multiply: function(number)
	{
		this.x *= number;
		this.y *= number;
	},
	/**
	Normalizes the current vector
	*/
	normalize: function()
	{
		var l = this.length();
		if( l != 0)
		{
			this.x /= l;
			this.y /= l;
		}
	},
	/**
	Returns a string representation of the vector
	@type String
	*/
	toString: function()
	{
		return '(x='+this.x+', y='+this.y+')';
	}
});