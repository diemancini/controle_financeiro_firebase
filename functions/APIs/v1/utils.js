module.exports = {

	isEmpty: function isEmpty(object) {
		return (object === undefined || object === null || object === "" || object.length === 0);	
	}
}