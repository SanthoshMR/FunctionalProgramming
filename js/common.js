function fakeApiCall() {
	return Promise.resolve(data);
};

function displayResults(memberName, tasks) {
	var tbl = $("<table class='table'/>").attr("id","mytable");
	$("#result").empty();
	$("#result").append(tbl);
	tasks.forEach(function(task) {
		var tr ="<tr>",
			td1 = "<td class='text-left'>" +task["title"] + "</td>",
			td2 = "<td>" +memberName + "</td>",
			td3 = "<td>" +task["dueDate"] + "</td>",
			td4 = "<td>" +task["priority"] + "</td></tr>";
		$("#mytable").append(tr + td1 + td2 + td3 + td4);
	});
};