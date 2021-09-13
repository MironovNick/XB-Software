
window.onload = function(){
	
	document.getElementsByClassName("tag_area")[0].innerHTML = MyTagger.tagRender();
	
}


function Tagger(state) {
	
	this._readOnly = state;
	this._tag_arr = [{name:'tagname1', index: 0}, {name:'tagname2', index: 1}];
	
	Object.defineProperties(this, {
        readOnly: {
             get: function() { return this._readOnly; },
             set: function(val) { this._readOnly = val; }
        }
    });
	
	this.addTag = function(tag_name) {
		
		if(!this.readOnly && tag_name != ''){
			
				let new_tag = {name: '', index: 0};
				
				if(this._tag_arr.length > 0){
					
					let last_elem = this._tag_arr.pop();
					this._tag_arr.push(last_elem);
					new_tag.index = last_elem.index;
					new_tag.index++;
					
				}
				
				new_tag.name = tag_name;
				this._tag_arr.push(new_tag);
			}
	};
	
	this.addTags = function(str) {
		
		if(!this.readOnly) {
			
			let names = str.split(" ");
			
			for(let i = 0; i < names.length; i++)
				this.addTag(names[i]);
		}
	};
	
	this.delTag = function(tag_index) {
		
		if(!this.readOnly){
			
			let i = this._tag_arr.findIndex((item) => {return tag_index === item.index});
			this._tag_arr.splice(i, 1);
		}
	};
	
	this.tagRender = function() {
		str = '';
	
		for(let i = 0; i < this._tag_arr.length; i++){
			
			str +=	'<div class="tag_bar">'+
						'<p class="tag_bar_p">'+ this._tag_arr[i].name +'</p>'+
						'<button class="tag_bar_del_button" onclick="dellTag(' + this._tag_arr[i].index + ')"> <p class="tag_bar_del_button_p">&#10006;</p> </button>'+
					'</div>';
		}
		
		return str;
	};
}

let MyTagger = new Tagger(false);

function addTag(){
	
	let tag_name_str = document.getElementById('main_inp').value;
	MyTagger.addTags(tag_name_str);
	document.getElementsByClassName("tag_area")[0].innerHTML = MyTagger.tagRender();
}

function dellTag(ind){
	
	if(!MyTagger.readOnly){
		MyTagger.delTag(ind);
		
		document.getElementsByClassName("tag_area")[0].innerHTML = MyTagger.tagRender();
	
	}
	
}

function readOnlyMode(){
	
	MyTagger.readOnly = !MyTagger.readOnly;
	
}



