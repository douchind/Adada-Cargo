(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
$(".js-form form").on("submit", function(event) {
  let isValid = true;
  const $form = $(this).closest("form");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  $form.find("[data-validate]").each(function(index, el) {
    const $this = $(el);
    const type = $this[0].type;
    if (type === "checkbox") {
      const $parent = $this.closest(".checkbox-alt");
      if ($this[0].checked) {
        $parent.removeClass("is-error");
        return;
      }
      $parent.addClass("is-error");
    }
    if (type === "text") {
      const $parent = $this.closest(".form__controls");
      if ($this[0].value === "") {
        $parent.addClass("is-error");
        return;
      }
      $parent.removeClass("is-error");
    }
    if (type === "password") {
      const $parent = $this.closest(".form__controls");
      if ($this[0].value === "") {
        $parent.addClass("is-error");
        return;
      }
      $parent.removeClass("is-error");
    }
    if ($this[0].tagName.toLowerCase() === "textarea") {
      const $parent = $this.closest(".form__controls");
      if ($this[0].value === "") {
        $parent.addClass("is-error");
        return;
      }
      $parent.removeClass("is-error");
    }
    if (type === "email") {
      const $parent = $this.closest(".form__controls");
      const emailValue = $this[0].value.trim();
      if (!emailRegex.test(emailValue)) {
        $parent.addClass("is-error");
        return;
      }
      $parent.removeClass("is-error");
    }
  });
  isValid = $form.find(".is-error").length === 0 ? true : false;
  if (!isValid) {
    event.preventDefault();
  }
});
function handleCustomSelect($select) {
  $select.each((idx, select) => {
    const $customSelect = $(select);
    const targetSelect = $customSelect.find("select");
    targetSelect.select2({
      placeholder: "Select a location",
      allowClear: true,
      dropdownParent: $customSelect,
      templateResult: function(data) {
        if (data.loading)
          return data.text;
        if (data.element && data.element.parentElement && data.element.parentElement.label) {
          data.parentText = data.element.parentElement.label;
        }
        return data.text;
      },
      matcher: function(params, data) {
        if ($.trim(params.term) === "")
          return data;
        if (!data.children) {
          if (data.text.toLowerCase().includes(params.term.toLowerCase()) || data.parentText && data.parentText.toLowerCase().includes(params.term.toLowerCase())) {
            return data;
          }
          return null;
        }
        const matchedChildren = [];
        for (let i = 0; i < data.children.length; i++) {
          const child = data.children[i];
          if (child.text.toLowerCase().includes(params.term.toLowerCase()) || data.text && data.text.toLowerCase().includes(params.term.toLowerCase())) {
            matchedChildren.push(child);
          }
        }
        if (matchedChildren.length > 0) {
          return $.extend({}, data, { children: matchedChildren });
        }
        return null;
      }
    });
  });
}
handleCustomSelect($(".js-select-custom"));
$(".js-select-custom select").on("change", function() {
  const $this = $(this);
  const imageTargetValue = $this.data("image-target");
  const $imageTarget = $(`[data-image="${imageTargetValue}"]`);
  const selectedValue = $(this).val();
  if (!selectedValue) {
    $imageTarget.removeClass("is-visible");
    return;
  }
  const images = {
    "tx-dallas": "assets/images/temp/banner-img1.png",
    "ca-los-angeles": "assets/images/temp/banner-img2.png",
    "ca-san-francisco": "assets/images/temp/banner-img3.png"
  };
  const newImage = images[selectedValue];
  $imageTarget.find("img").attr("src", newImage);
  $imageTarget.addClass("is-visible");
});
const $noRadio = $("#radio-alt-1");
const $yesRadio = $("#radio-alt-2");
const $receiverCol = $(".form__col--receiver");
$noRadio.on("change", function() {
  if ($(this).is(":checked")) {
    $receiverCol.removeClass("is-active");
  }
});
$yesRadio.on("change", function() {
  if ($(this).is(":checked")) {
    $receiverCol.addClass("is-active");
  }
});
function handleCustomSelectPrice($select) {
  $select.each((idx, select) => {
    const $customSelect = $(select);
    const targetSelect = $customSelect.find("select");
    targetSelect.select2({
      placeholder: "Select a duration",
      allowClear: true,
      dropdownParent: $customSelect,
      templateResult: formatOption,
      templateSelection: formatSelected
    });
  });
}
function formatOption(option) {
  if (!option.id)
    return option.text;
  const time = $(option.element).data("time");
  const price = $(option.element).data("price");
  return $(`
	<div class="select-option">
	  <span class="select-option__time">${time}</span>
	  <span class="select-option__price">${price}</span>
	</div>
  `);
}
function formatSelected(option) {
  if (!option.id)
    return option.text;
  const time = $(option.element).data("time");
  const price = $(option.element).data("price");
  return `${time} – ${price}`;
}
handleCustomSelectPrice($(".js-select-custom-price"));
function handleCustomFlags($customFlags) {
  $customFlags.each((idx, customFlag) => {
    const $customFlag = $(customFlag);
    const $targetSelect = $customFlag.find("select");
    $targetSelect.select2({
      templateResult: formatCountry,
      templateSelection: formatCountry,
      dropdownParent: $customFlag,
      minimumResultsForSearch: -1
    });
  });
}
function formatCountry(state) {
  if (!state.id)
    return state.text;
  const flag = $(state.element).data("flag");
  let imgUrl;
  if (flag === "trnc") {
    imgUrl = "assets/images/svg/trnc.png";
  } else {
    imgUrl = `https://flagcdn.com/${flag}.svg`;
  }
  return $(`
		<span style="margin-top: 3px; display: inline-block;">
			<img src="${imgUrl}" width="28" style="display: inline-block; margin-top: -5px;" />
			${state.text}
		</span>
	`);
}
handleCustomFlags($(".js-custom-flags"));
const countryFormats = {
  tr: { code: "+90", format: "XXX XXX XX XX", placeholder: "50X XXX XX XX" },
  bg: { code: "+359", format: "XXX XXX XXX", placeholder: "XXX XXX XXX" },
  us: { code: "+1", format: "(XXX) XXX-XXXX", placeholder: "(XXX) XXX-XXXX" }
};
function formatPhoneNumber(value, countryCode) {
  const format = countryFormats[countryCode];
  if (!format)
    return value;
  const digits = value.replace(/\D/g, "");
  let phoneDigits = digits;
  let formatted = "";
  let digitIndex = 0;
  for (let i = 0; i < format.format.length && digitIndex < phoneDigits.length; i++) {
    if (format.format[i] === "X") {
      formatted += phoneDigits[digitIndex];
      digitIndex++;
    } else {
      formatted += format.format[i];
    }
  }
  return formatted;
}
$(".js-phone-field").on("input", function(e) {
  const $input = $(this);
  const $flagsSelect = $input.siblings(".js-custom-flags").find("select");
  const selectedCountry = $flagsSelect.val() || "tr";
  const currentValue = e.target.value;
  const formatted = formatPhoneNumber(currentValue, selectedCountry);
  e.target.value = formatted;
  const format = countryFormats[selectedCountry];
  if (format) {
    e.target.placeholder = format.placeholder;
  }
});
$(".js-custom-flags select").on("change", function() {
  const $select = $(this);
  const $phoneInput = $select.closest(".form__controls").find(".js-phone-field");
  const selectedCountry = $select.val();
  const format = countryFormats[selectedCountry];
  if (format) {
    $phoneInput.attr("placeholder", format.placeholder);
  }
  const currentValue = $phoneInput.val();
  if (currentValue) {
    const formatted = formatPhoneNumber(currentValue, selectedCountry);
    $phoneInput.val(formatted);
  }
});
$(document).ready(function() {
  $(".js-phone-field").each(function() {
    const $input = $(this);
    const $flagsSelect = $input.siblings(".js-custom-flags").find("select");
    const selectedCountry = $flagsSelect.val() || "tr";
    const format = countryFormats[selectedCountry];
    if (format) {
      $input.attr("placeholder", format.placeholder);
    }
  });
});
$(".js-accordion .accordion__head").on("click", function(e) {
  $(this).closest(".accordion__section").toggleClass("is-open").siblings().removeClass("is-open");
  e.preventDefault();
});
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    const isVisible = entry.isIntersecting;
    if (isVisible) {
      entry.target.classList.add("is-visible");
    }
  });
};
const observer = new IntersectionObserver(observerCallback, {
  rootMargin: "-30%"
});
$(".js-skip").on("click", function(event) {
  if ($(this).is("a")) {
    event.preventDefault();
  }
  const targetData = $(this).data("target");
  const $target = $(`[data-target-element="${targetData}"]`);
  if ($target.length) {
    $("html, body").animate({ scrollTop: $target.offset().top }, 200);
  }
});
$(window).on("load", () => {
  setTimeout(() => {
    $(".js-animate").each((index, element) => {
      observer.observe(element);
    });
  }, 500);
});
$(window).on("load", () => {
  const $loadingWrapper = $(".js-loading-wrapper");
  $loadingWrapper.addClass("page-loaded");
  setTimeout(() => {
    $loadingWrapper.addClass("hidden");
  }, 300);
});
function handleSelect($select) {
  const $selectTarget = $select.find("select");
  const $input = $select.find("input");
  $selectTarget.on("change", function() {
    if ($(this).val() === "other") {
      $input.show();
    } else {
      $input.hide().val("");
    }
  });
}
handleSelect($(".js-select"));
$(".js-quantity").on("click", ".btn-increase", function(event) {
  event.preventDefault();
  const $input = $(this).closest(".checkbox").find("input");
  const $countSpan = $(this).closest(".js-quantity").find(".checkbox__count");
  let count = parseInt($countSpan.text());
  count += 1;
  $countSpan.text(count);
  $input.attr("checked", true);
});
$(".js-quantity").on("click", ".btn-decrease", function(event) {
  event.preventDefault();
  const $input = $(this).closest(".checkbox").find("input");
  const $countSpan = $(this).closest(".js-quantity").find(".checkbox__count");
  let count = parseInt($countSpan.text());
  if (count === 0) {
    return;
  }
  count -= 1;
  $countSpan.text(count);
  if (count === 0) {
    $input.attr("checked", false);
    return;
  }
});
const $header = $(".js-header");
const handleNavTriggerClick = (event) => {
  event.preventDefault();
  $header.toggleClass("menu-visible");
};
const handleOutsideClick = (event) => {
  if ($(event.target).closest(".header").length === 0) {
    $header.removeClass("menu-visible");
  }
};
function hideMenuOnDesktop() {
  if ($(this).innerWidth() < 1023) {
    return;
  }
  $header.removeClass("menu-visible");
}
$(window).on("load resize", hideMenuOnDesktop);
$(document).on("click", handleOutsideClick);
$(".js-nav-trigger").on("click", handleNavTriggerClick);
