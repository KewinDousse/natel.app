// Turns the stacked install panels into tabs. Without this script, every
// panel stays visible under its own heading.
for (const box of document.querySelectorAll("[data-tabs]")) {
  const list = box.querySelector("[data-tablist]");
  const panels = [...box.querySelectorAll("[data-panel]")];
  list.setAttribute("role", "tablist");
  list.setAttribute("aria-label", "Installation");

  const tabs = panels.map((panel) => {
    const title = panel.querySelector(".panel-title");
    const tab = document.createElement("button");
    tab.type = "button";
    tab.id = `${panel.id}-tab`;
    tab.className = "tab";
    tab.textContent = title.textContent;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    title.hidden = true;
    list.append(tab);
    return tab;
  });

  const select = (index, focus) => {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  };

  list.addEventListener("click", (event) => {
    const index = tabs.indexOf(event.target.closest("[role=tab]"));
    if (index >= 0) select(index, false);
  });
  list.addEventListener("keydown", (event) => {
    const current = tabs.indexOf(document.activeElement);
    const last = tabs.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, true);
  });

  list.hidden = false;
  box.classList.add("is-tabs");
  select(0, false);
}
