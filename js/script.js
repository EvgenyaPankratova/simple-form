const myForm = document.querySelector("form");
const checkBox = document.querySelector(".checkboxCurrent");

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!checkBox.checked) {
    alert("Вы не приняли условия использования");
    throw new Error("Вы не приняли условия использования");
  }

  try {
    const data = new FormData(myForm);

    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(response.status, response.statusText);
    }

    const res = await response.json();
  } catch (err) {
    console.error(err);
  } finally {
    alert("Форма успешно отправлена");
  }
};

myForm.addEventListener("submit", handleSubmit);

document.querySelectorAll(".select").forEach((root) => {
  const native = root.querySelector(".select__native");
  const trigger = root.querySelector(".select__trigger");
  const valueEl = root.querySelector(".select__value");
  const list = root.querySelector(".select__list");

  const open = () => {
    list.hidden = false;
    root.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    list.hidden = true;
    root.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  const toggle = () => (list.hidden ? open() : close());

  trigger.addEventListener("click", toggle);

  list.addEventListener("click", (e) => {
    const li = e.target.closest('[role="option"]');
    if (!li) return;

    native.value = li.dataset.value;
    valueEl.textContent = li.textContent;

    list
      .querySelectorAll('[role="option"]')
      .forEach((o) =>
        o.setAttribute("aria-selected", o === li ? "true" : "false"),
      );

    native.dispatchEvent(new Event("change", { bubbles: true }));
    close();
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !list.hidden) {
      close();
      trigger.focus();
    }
  });
});
