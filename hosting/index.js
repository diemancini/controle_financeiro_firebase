window.onload = function initApp() {

	var config = {
		apiKey: "AIzaSyBHxc2B71XbfRh9jBg78E7NQsePZSdwYOQ",
	    authDomain: "controle-financeiro-2a5d2.firebaseapp.com",
	    databaseURL: "https://controle-financeiro-2a5d2.firebaseio.com",
	    projectId: "controle-financeiro-2a5d2",
	    //storageBucket: "controle-financeiro-2a5d2.appspot.com",
	    //messagingSenderId: "980411468358"
	};

	firebase.initializeApp(config);

	firebase.auth().signOut();
	firebase.auth().onAuthStateChanged(function(user) {

		if (user) {
			//console.log('Em onAuthStateChanged, user: '+ user);
			console.log('Em onAuthStateChanged, user: ', user);
		}
	});

	form = document.getElementById('form');
	form.onsubmit = signIn;
}

function signIn(e) {

	// stop the regular form submission
	e.preventDefault();

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		return alert('Endereço de e-mail inválido.');
	}

	if (password.length < 1) {
		return alert('Por favor digite sua senha.');
	}

	document.getElementById('sendButton').disabled = true;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(function(firebaseUser) {
			alert("token: "+ firebase.auth().currentUser.getIdToken().C.za);
			console.log("token: "+ firebase.auth().currentUser.getIdToken().C.za);
		})
		.catch(function(error) {

			if (error.code === 'auth/wrong-password') {
				alert('Usuário ou senha inválido.');
			} else {
				alert('Erro desconhecido.');
				console.error(`Error [${error.code}] ${error.message}`);
			}

		}).then(function() {
			document.getElementById('sendButton').disabled = false;
		});
}