document.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector(".header");
	const mainContent = document.querySelector(".main-content");
	const menuOverlay = document.querySelector(".menu");
	const menuButton = document.querySelector(".header__navbar-button");
	const burgerMenuIcon = document.querySelector(".burger-menu");
	const openModalButton = document.getElementById("modal-open");
	const closeModalButton = document.getElementById("modal-close");
	const modal = document.querySelector(".modal");
	const nameInput = document.getElementById("name-input");
	const namePlaceholder = document.getElementById("name-placeholder");

	function toggleMenu() {
		const isOpen = menuOverlay.classList.toggle("is-menu-open");
		document.body.classList.toggle("no-scroll");
		burgerMenuIcon.classList.toggle("is-active");

		if (isOpen) {
			const firstFocusableElement = menuOverlay.querySelectorAll("a");
			if (firstFocusableElement) {
				firstFocusableElement.focus();
			}
		}
	}

	menuOverlay.addEventListener("keydown", function (e) {
		const focusableElements = menuOverlay.querySelectorAll(".menu__content-list-link");
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (e.key === "Tab") {
			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		}
	});

	modal.addEventListener("keydown", function (e) {
		const focusableElements = modal.querySelectorAll("button, input");
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (e.key === "Tab") {
			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		}
	});

	function closeModal() {
		namePlaceholder.textContent = "{name placeholder}";
		nameInput.value = "";
		modal.style.display = "none";
		header.classList.remove("is-blurred");
		mainContent.classList.remove("is-blurred");
		document.documentElement.style.overflow = "visible";
	}

	header.addEventListener("click", function (e) {
		if (e.target.closest(".header__navbar-button")) {
			toggleMenu();
		} else if (!menuOverlay.contains(e.target) && !menuButton.contains(e.target)) {
			menuOverlay.classList.remove("is-menu-open");
			document.body.classList.remove("no-scroll");
			burgerMenuIcon.classList.remove("is-active");
		}
	});

	document.addEventListener("click", function (e) {
		if (e.target === openModalButton) {
			modal.style.display = "block";
			document.documentElement.style.overflow = "hidden";
			header.classList.add("is-blurred");
			mainContent.classList.add("is-blurred");
			const firstFocusableElement = modal.querySelector("button, input");
			if (firstFocusableElement) {
				firstFocusableElement.focus();
			}
		} else if (e.target === modal || e.target === closeModalButton) {
			closeModal();
		}
	});

	nameInput.addEventListener("input", function () {
		namePlaceholder.textContent = nameInput.value || "{name placeholder}";
	});

	nameInput.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			closeModal();
		}
	});
});
