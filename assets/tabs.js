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

async function copyCode(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Selection-based copying also works on local HTTP previews.
    }
  }

  const input = document.createElement("textarea");
  input.className = "copy-buffer";
  input.value = text;
  input.readOnly = true;
  document.body.append(input);
  try {
    input.select();
    if (!document.execCommand("copy")) throw new Error("Copy unavailable");
  } finally {
    input.remove();
  }
}

for (const box of document.querySelectorAll("[data-code-example]")) {
  const code = box.querySelector("pre code");
  const copy = box.querySelector("[data-copy-code]");
  const download = box.querySelector("[data-download-code]");
  const status = box.querySelector("[data-code-status]");
  const filename = box.dataset.filename;
  let reset;

  // Both actions read the displayed code to keep one source of truth.
  const text = () => `${code.textContent.trimEnd()}\n`;

  copy.addEventListener("click", async () => {
    clearTimeout(reset);
    copy.disabled = true;
    status.textContent = "";
    try {
      await copyCode(text());
      copy.dataset.state = "copied";
      copy.title = "Copied";
      status.textContent = `${filename} copied to clipboard.`;
    } catch {
      copy.dataset.state = "failed";
      copy.title = "Copy failed";
      status.textContent = "Copy unavailable. Select and copy the code below.";
    } finally {
      copy.disabled = false;
      copy.focus({ preventScroll: true });
      reset = setTimeout(() => {
        delete copy.dataset.state;
        copy.title = `Copy ${filename}`;
      }, 3000);
    }
  });

  download.addEventListener("click", () => {
    const file = new Blob([text()], { type: "application/yaml;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = `Download of ${filename} started.`;
  });

  box.querySelector("[data-code-actions]").hidden = false;
}
