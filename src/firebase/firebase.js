import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		this.storage = app.storage();
		this.db = app.firestore();
		this.auth = app.auth();
	}

	// AUTH ACTIONS 
	// --------

	createAccount = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	signInWithGoogle = () => this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

	signInWithFacebook = () => this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

	signInWithGithub = () => this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

	signOut = () => this.auth.signOut();

	passwordReset = email => this.auth.sendPasswordResetEmail(email);

	addUser = (id, user) => this.db.collection('users').doc(id).set(user);

	getUser = id => this.db.collection('users').doc(id).get();

	passwordUpdate = password => this.auth.currentUser.updatePassword(password);

	changePassword = (currentPassword, newPassword) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updatePassword(newPassword).then(() => {
					resolve('Password updated successfully!');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	reauthenticate = (currentPassword) => {
		const user = this.auth.currentUser;
		const cred = app.auth.EmailAuthProvider.credential(user.email, currentPassword);

		return user.reauthenticateWithCredential(cred);
	}

	updateEmail = (currentPassword, newEmail) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updateEmail(newEmail).then(() => {
					resolve('Email Successfully updated');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	updateProfile = (id, updates) => this.db.collection('users').doc(id).update(updates);

	onAuthStateChanged = () => {
		return new Promise((resolve, reject) => {
			this.auth.onAuthStateChanged((user) => {
				if (user) {
					resolve(user);
				} else {
					reject(new Error('Auth State Changed failed'));
				}
			});
		});
	}

	setAuthPersistence = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

	getUsers = (lastRefKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db.collection('users').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(12);
					const snapshot = await query.get();
					const users = [];
					snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ users, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch users.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					// const totalQuery = await this.db.collection('users').get();
					// const total = totalQuery.docs.length;
					const query = this.db.collection('users').orderBy(app.firestore.FieldPath.documentId()).limit(1000);
					const snapshot = await query.get();
					const total = snapshot.docs.length;

					clearTimeout(timeout);
					if (!didTimeout) {
						const users = [];
						snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ users, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch users: An error occured while trying to fetch users or there may be no users ', e);
					reject(new Error(':( Failed to fetch users.'));
				}
			}
		});
	}

	// // PRODUCT ACTIONS
	// // ---------
	getProduct = (id) => this.db.collection('products').doc(id).get();

	getProducts = (lastRefKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					// const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(1000);
					const query = this.db.collection('products').orderBy('name').startAfter(lastRefKey);
					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					// getting the total count of data

					// adding shallow parameter for smaller response size
					// better than making a query from firebase
					// NOT AVAILEBLE IN FIRESTORE const request = await fetch(`${process.env.FIREBASE_DB_URL}/products.json?shallow=true`);

					// const totalQuery = await this.db.collection('products').get();
					// const total = totalQuery.docs.length;
					// const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).limit(1000);
					const query = this.db.collection('products').orderBy('name');
					const snapshot = await query.get();
					const total = snapshot.docs.length;

					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	// getProductsAdmin = (lastRefKey) => {
	// 	let didTimeout = false;

	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			const query = this.db.collection('products').orderBy('name');
	// 			const snapshot = await query.get();
	// 			const total = snapshot.docs.length;

	// 			clearTimeout(timeout);
	// 			if (!didTimeout) {
	// 				const products = [];
	// 				snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
	// 				const lastKey = snapshot.docs[snapshot.docs.length - 1];

	// 				resolve({ products, lastKey, total });
	// 			}
	// 		} catch (e) {
	// 			if (didTimeout) return;
	// 			console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
	// 			reject(new Error(':( Failed to fetch products.'));
	// 		}
	// 	});
	// }

	getProductsByCategory = (category) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			const timeout = setTimeout(() => {
				didTimeout = true;
				reject(new Error('Request timeout, please try again'));
			}, 15000);
			try {
				const query = this.db.collection('products').where("category", "==", category).orderBy('name');
				const snapshot = await query.get();
				const total = snapshot.docs.length;

				clearTimeout(timeout);
				if (!didTimeout) {
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey, total });
				}
			} catch (e) {
				if (didTimeout) return;
				console.log('Ha ocurrido un error o no hay productos que mostrar ', e);
				reject(new Error(':( Ha ocurrido un error.'));
			}
		});
	}


	addProduct = (id, product) => this.db.collection('products').doc(id).set(product);

	generateKey = () => this.db.collection('products').doc().id;

	storeImage = async (id, folder, imageFile) => {
		const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
		const downloadURL = await snapshot.ref.getDownloadURL();

		return downloadURL;
	}

	deleteImage = id => this.storage.ref('products').child(id).delete();

	editProduct = (id, updates) => this.db.collection('products').doc(id).update(updates);

	removeProduct = id => this.db.collection('products').doc(id).delete();

	getProductsOnSale = (lastRefKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db.collection('products').where("onSale", "==", "true")
						.orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey);
					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					// getting the total count of data

					// adding shallow parameter for smaller response size
					// better than making a query from firebase
					// NOT AVAILEBLE IN FIRESTORE const request = await fetch(`${process.env.FIREBASE_DB_URL}/products.json?shallow=true`);

					// const totalQuery = await this.db.collection('products').get();
					// const total = totalQuery.docs.length;
					const query = this.db.collection('products').where("onSale", "==", "true")
						.orderBy(app.firestore.FieldPath.documentId());
					const snapshot = await query.get();
					const total = snapshot.docs.length;

					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	// //ORDER ACTIONS
	// //-------------
	addOrder = (id, order) => this.db.collection('orders').doc(id).set(order);

	editOrder = (id, updates) => this.db.collection('orders').doc(id).update(updates);

	getOrder = (id) => this.db.collection('orders').doc(id).get();

	getOrders = (lastRefKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db.collection('orders').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(12);
					const snapshot = await query.get();
					const orders = [];
					snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ orders, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch orders.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await this.db.collection('orders').get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('orders').orderBy(app.firestore.FieldPath.documentId()).limit(12);
					const snapshot = await query.get();

					clearTimeout(timeout);
					if (!didTimeout) {
						const orders = [];
						snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ orders, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch orders: An error occured while trying to fetch orders or there may be no orders ', e);
					reject(new Error(':( Failed to fetch orders.'));
				}
			}
		});
	}

	// // BRANDS ACTIONS
	// // ---------
	getBrand = (id) => this.db.collection('brands').doc(id).get();

	getBrands = (lastRefKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db.collection('brands').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(100);
					const snapshot = await query.get();
					const brands = [];
					snapshot.forEach(doc => brands.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ brands, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch brands.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					// const totalQuery = await this.db.collection('brands').get();
					// const total = totalQuery.docs.length;
					const query = this.db.collection('brands').orderBy(app.firestore.FieldPath.documentId());
					const snapshot = await query.get();
					const total = snapshot.docs.length;

					clearTimeout(timeout);
					if (!didTimeout) {
						const brands = [];
						snapshot.forEach(doc => brands.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ brands, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch brands: An error occured while trying to fetch brands or there may be no brands ', e);
					reject(new Error(':( Failed to fetch brands.'));
				}
			}
		});
	}
	generateBrandKey = () => this.db.collection('brands').doc().id;
	addBrand = (id, brand) => this.db.collection('brands').doc(id).set(brand);
	editBrand = (id, updates) => this.db.collection('brands').doc(id).update(updates);
	removeBrand = id => this.db.collection('brands').doc(id).delete();

	// // CATEGORIES ACTIONS
	// // ---------
	getCategory = (id) => this.db.collection('categories').doc(id).get();

	getCategories = (lastRefKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db.collection('categories').orderBy(app.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(100);
					const snapshot = await query.get();
					const categories = [];
					snapshot.forEach(doc => categories.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ categories, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch categories.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					// const totalQuery = await this.db.collection('categories').get();
					// const total = totalQuery.docs.length;
					const query = this.db.collection('categories').orderBy(app.firestore.FieldPath.documentId());
					const snapshot = await query.get();
					const total = snapshot.docs.length;

					clearTimeout(timeout);
					if (!didTimeout) {
						const categories = [];
						snapshot.forEach(doc => categories.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ categories, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch categories: An error occured while trying to fetch categories or there may be no categories ', e);
					reject(new Error(':( Failed to fetch categories.'));
				}
			}
		});
	}

	generateCategoryKey = () => this.db.collection('categories').doc().id;
	addCategory = (id, category) => this.db.collection('categories').doc(id).set(category);
	editCategory = (id, updates) => this.db.collection('categories').doc(id).update(updates);
	removeCategory = id => this.db.collection('categories').doc(id).delete();
}

const firebase = new Firebase();

export default firebase;
