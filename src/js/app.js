/* eslint-disable no-eval */
// JQuery modules
import 'jquery.inputmask';
import 'jquery-lazy';
import 'jquery-modal';
import 'jquery-validation';
import 'jquery.cookie';

import 'inputmask.numeric.extensions';

import $ from 'jquery';

// Select2
import 'select2/dist/js/select2.full.js';

// Fancybox
import { Fancybox } from '@fancyapps/ui';

// Swiper modules
import Swiper from 'swiper';
import {
  Autoplay, Grid, Navigation, Pagination,
} from 'swiper/modules';

// self
import MarkSearch from './header/MarkSearch.js';
import './ui/range.js';
import Timer from './ui/timer.js';
import Tab from './ui/tabs.js';

// config file
// import configuration from './configuration.js';

// import styles
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'select2/dist/css/select2.min.css';
import 'jquery-modal/jquery.modal.min.css';
import 'swiper/css/bundle';
import '../scss/app.scss';
import CreditCalculator from './calculator/index.js';
import TimerOffer from './ui/offerTimer.js';
import CallbackWidget from './callback/index.js';

window.$ = $;
// window.configuration = configuration;
window.app = {
  runMasks: () => {
    $('.js-phone-mask').inputmask({
      mask: '+7 (*99) 999-99-99',
      definitions: {
        '*': {
          validator: '[4,9]',
        },
      },
      showMaskOnHover: false,
    });

    $('.js-digits-mask').inputmask({
      alias: 'currency',
      allowMinus: 'false',
      digits: '0',
      groupSeparator: ' ',
      rightAlign: false,
      prefix: '',
    });

    $('.js-numeric-mask').inputmask({
      alias: 'numeric',
      allowMinus: 'false',
      rightAlign: false,
    });
  },
  runSwiper: () => {
    const slides = configuration.sliders;
    const defaultSwiperBullets = (index, className) => `<span class="${className}">${index + 1}</span>`;
    const defaultNavigation = {
      enabled: true,
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      lockClass: 'swiper-hide-pagination',
    };
    const defaultPagination = {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      lockClass: 'swiper-hide-pagination',
      renderBullet: defaultSwiperBullets,
    };

    if (window.outerWidth <= 1332) {
      slides.newCars.slidesPerView = 3;
    }

    if (window.outerWidth <= 1100) {
      slides.newCars.slidesPerGroup = 1;
      slides.newCars.slidesPerView = 1;
      slides.mostPopular.grid.rows = 4;
      slides.mostPopular.slidesPerView = 1;
      slides.catalogSwiper.slidesPerView = 1;
      slides.carCatalogSwiper.slidesPerView = 1;
      slides.carCatalogSwiper.slidesPerGroup = 1;
      slides.contactsGallerySwiper.slidesPerGroup = 1;
      slides.contactsGallerySwiper.slidesPerView = 1;
      slides.howToSwiper.pagination = {
        type: 'fraction',
        el: '.how-to__pagination__mobile .swiper-pagination',
      };
      $('.compare-navigation-prev').remove();
      $('.compare-navigation-next').remove();
      slides.allFeedbacksSwiper.grid.rows = 3;
      slides.allFeedbacksSwiper.slidesPerView = 1;
    }

    if (window.outerWidth <= 699) {
      slides.carGallerySwiper.slidesPerView = 1;
    }

    const newCarsSwiper = new Swiper('.new-cars-swiper', {
      ...slides.newCars,
      modules: [Grid, Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const mostPopularSwiper = new Swiper('.most-popular-swiper', {
      ...slides.mostPopular,
      modules: [Grid, Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const carGallerySwiper = new Swiper('.car-gallery-swiper', {
      ...slides.carGallerySwiper,
      modules: [Pagination, Navigation],
      navigation: defaultNavigation,
    });

    $.fn.shuffle = function() {
      var allElems = this.get();
      var getRandom = function(max) {
        return Math.floor(Math.random() * max);
      };
      var shuffled = $.map(allElems, function() {
        var random = getRandom(allElems.length);
        var randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

      this.each(function(i) {
        $(this).replaceWith($(shuffled[i]));
      });
      return $(shuffled);
    };

    const bannerSlides = $('.banner-swiper').find('.swiper-slide');
    bannerSlides.shuffle();

    const bannerSwiper = new Swiper('.banner-swiper', {
      ...slides.bannerSwiper,
      modules: [Pagination, Autoplay],
      pagination: {
        clickable: false,
        el: '.banner-swiper-pagination',
        renderBullet: function (index, className) {
          return (`
            <div class="banner-swiper-bullet ${className}">
              <div class="banner-swiper-progress"></div> 
            </div>
          `);
        },
      },
      on: {
        autoplayTimeLeft(_, __, progress) {
          const progressInPercents = Math.round(progress * 100);
          $('.swiper-pagination-bullet-active .banner-swiper-progress').css({
            width: `${progressInPercents}%`,
            height: '4px',
            background: '#9CA5B3',
          });
        },
      },
    });

    const catalogSwiper = new Swiper('.catalog-swiper', {
      ...slides.catalogSwiper,
      modules: [Grid, Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const carCatalogSwiper = new Swiper('.car-catalog-swiper', {
      ...slides.carCatalogSwiper,
      modules: [Pagination, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const contactsGallerySwiper = new Swiper('.contacts-gallery-swiper', {
      ...slides.contactsGallerySwiper,
      modules: [Pagination, Navigation, Grid],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const howToSwiper = new Swiper('.how-to-swiper', {
      modules: [Pagination, Navigation],
      pagination: {
        type: 'fraction',
        el: '.swiper-pagination',
      },
      navigation: defaultNavigation,
      ...slides.howToSwiper,
    });

    const allFeedbacksSwiper = new Swiper('.all-feedbacks-swiper', {
      ...slides.allFeedbacksSwiper,
      modules: [Pagination, Grid, Navigation],
      pagination: defaultPagination,
      navigation: defaultNavigation,
    });

    const compareBodySwipers = [];
    const compareSwiper = new Swiper('.compareSwiper', {
      modules: [Pagination, Navigation],
      ...slides.compireSwiper,
      navigation: defaultNavigation,
      on: {
        slideChange() {
          compareBodySwipers.forEach((swiper) => {
            swiper.slideToLoop(this.realIndex);
          });
        },
      },
    });

    $('.compareSwiper-body').each((index, el) => {
      $(el).addClass(`compareSwiper-body-${index}`);
      compareBodySwipers.push(new Swiper(`.compareSwiper-body-${index}`, {
        ...slides.compireSwiper,
        allowTouchMove: false,
        modules: [Pagination, Navigation],
        pagination: defaultPagination,
        navigation: defaultNavigation,
      }));
    });

    return {
      allFeedbacksSwiper,
      contactsGallerySwiper,
      carCatalogSwiper,
      carGallerySwiper,
      newCarsSwiper,
      mostPopularSwiper,
      bannerSwiper,
      catalogSwiper,
      howToSwiper,
      compareSwiper,
    };
  },
  runTimers: () => {
    const timer = new Timer('.timer');
    timer.start(); // Вызовет countdownTimer() и начнет обновление каждую секунду

    const dealTimer = new Timer('.deal-timer');
    dealTimer.start();
  },
  compareButtonInit: function() {
    $('.compare__item__cross').each((_, el) => {
      $(el).on('click', (event) => {
        const countCar = $('.compareSwiper .swiper-wrapper').children().length;

        if (countCar === 2) return;

        $('.compare__title__count').text(`(${countCar - 1})`);
        const compareItemId = $(event.currentTarget).closest('.compare__item').data('complectation-id');
        $(`[data-complectation-id="${compareItemId}"]`).remove();
      });

      compareListener();
    });

    window.addEventListener('scroll', () => {
      const image = $('.compare__item__image ');
      image.toggleClass('scrolled', window.scrollY > 250);
    });

    function compareListener() {
      $('#compare-only').off('change.compare').on('change.compare', (event) => {
        const checked = $(event.currentTarget).is(':checked');
        const countCar = $('.compareSwiper .swiper-wrapper').children().length;

        if (checked) {
          $('.compareSwiper-body').each((index, el) => {
            if ($(el).find('.parameter__item[data-plus]').length === countCar) {
              $(el).closest('.compareSwiper-body').hide();
            }
            if ($(el).find('.parameter__item[data-minus]').length === countCar) {
              $(el).closest('.compareSwiper-body').hide();
            }
          });
          const params = $('.parameters');

          params.each((index, el) => {
            const allParamsLen = $(el).find('.parameter').length;
            const hiddenParamsLen = $(el).find('.parameter[style="display: none;"]').length;

            if (allParamsLen === hiddenParamsLen) {
              $(el).prev().hide();
            }
          });
        } else {
          $('.compareSwiper-body').show();
          $('.compare__list__title__wrapper').show();
        }
      });
    }

    compareListener();

    const $compareButton = $('.complectation__button');

    if (!$compareButton.length) return;

    $compareButton.on('click', () => {
      const href = $compareButton.data('href');
      const activeToggles = $('.compare-checkbox:enabled:checked');

      if (!activeToggles.length) return window.location.href = href;

      const complectationIds = [];

      activeToggles.each((index, el) => {
        complectationIds.push($(el).data('car-id'));
      });

      return window.location.href = href + '?prices=' + complectationIds;
    });
  },
  runListeners: () => {
    $('#show-more-btn').on('click', (event) => {
      const target = $(event.currentTarget);
      if (target.text() === 'Показать все марки') {
        $('.car-brands__more').css({ display: 'flex' });
        return target.text('Скрыть марки');
      }

      $('.car-brands__more').css({ display: 'none' });
      return target.text('Показать все марки');
    });

    $('.menu-icon').on('click', () => {
      $('.mobile-menu').addClass('active');
    });

    $('.mobile-menu__backdrop').on('click', () => {
      $('.mobile-menu').removeClass('active');
    });

    $('.mobile-menu__content .cross').on('click', () => {
      $('.mobile-menu').removeClass('active');
    });
  },
  runTabs: () => {
    const mostPopularTabs = new Tab('.most-popular__tabs-container');
    const specTabs = new Tab('.specs__container');
    const mobileSpecTabs = new Tab('.modal-specs__tabs-container');

    return {
      specTabs,
      mostPopularTabs,
      mobileSpecTabs,
    };
  },
  runFindByMark: async () => new MarkSearch(await MarkSearch.getMarks()),
  runLazy: () => {
    $('.lazy').Lazy({
      // visibleOnly: true,
      threshold: 800, // изображения начнут загружаться за 500 пикселей до того, как они окажутся видимыми
      combined: true,
      afterLoad: function(element) {
        element.addClass('loaded');
      },
    });
  },
  runSelect2: () => {
    $('.select').select2();
  },
  runFancybox: () => {
    Fancybox.bind('[data-fancybox]', {});
  },
  runColors: () => {
    const $colorLinks = $('[data-color-link]');
    const $currentColorName = $('[data-current-color-name]');
    const $activeColorImage = $('[data-current-color-src]');

    $colorLinks.on('click', (event) => {
      $colorLinks.removeClass('active');
      $activeColorImage.attr('src', $(event.currentTarget).addClass('active').attr('data-color-link'));
      $currentColorName.text($(event.currentTarget).attr('data-color-name'));
    });
  },
  runFormsValidation: () => {
    jQuery.validator.addMethod('agreementValidator', function(value, element) {
      const isChecked = $(element).is(':checked');
      if (!isChecked) {
        $('.agreement__wrapper').addClass('shake');
        return false;
      }
      $('.agreement__wrapper').removeClass('shake');
      return true;
    });

    jQuery.validator.addMethod('ruPhone', function(phone_number, element) {
      function countDigits(str) {
        const regex = /\d/g;
        const matches = str.match(regex);

        if (matches) {
          return matches.length;
        }
        return 0;
      }

      return countDigits(phone_number) >= 11;
    });

    // Получение CSRF токена из метатега
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Универсальная функция для выполнения AJAX-запросов
    function ajaxRequest(url, method, data, onSuccess, onError) {
      $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        headers: { 'X-CSRF-TOKEN': csrfToken },
        data: JSON.stringify(data),
        success: onSuccess,
        error: onError || function(xhr, status, error) {
          console.error('Error:', status, error);
        },
      });
    }

    // Открытие капчи в модальном окне
    function openCaptchaModal(formData, formElement) {
      const captcha = $('#captcha-modal');

      captcha.modal({
        fadeDuration: 100,
      });

      if (window.smartCaptcha) {
        const container = $('.smart-captcha')[0];
        window.smartCaptcha.render(container, {
          sitekey: window.sitekey,
          hl: 'ru',
          callback: function(token) {
            ajaxRequest('/form/send/captcha', 'POST', { captcha: token }, function(data) {
              if (data.success) {
                submitForm(formData, formElement);
              } else {
                alert('Капча не прошла проверку: ' + data.message);
              }
            });
          },
        });
      }
    }

    // Открытие капчи в модальном окне
    function openVerificate(formData, formElement) {
      const captcha = $('#captcha-number');

      // Получаем CSRF токен из мета-тега
      const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      if (!csrf) {
        console.error('CSRF токен не найден');
        return;
      }

      const phone = formData.telephone;
      const cleanPhone = phone.replace(/[^\d]/g, '');
      const dataIdView = formElement.getAttribute('data-id');

      if (cleanPhone && cleanPhone.length === 11) {
        const formattedPhone = `+7 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(4, 7)}-**-**`;
        document.querySelector('.captcha-number_text b').textContent = formattedPhone;
        // Отправка запроса для получения кода подтверждения через GET
        const url = `/form/call/send?phone=${encodeURIComponent(cleanPhone)}`;

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': csrfToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              captcha.find('form').attr('data-view', dataIdView);
              captcha.modal({
                fadeDuration: 100,
              });
              $('#captcha-number input:first').trigger('focus');
            } else {
              $.modal.close();

              const modal = $('#success-modal');

              modal.modal({
                fadeDuration: 100,
              });
            }
          })
          .catch((error) => {
            console.log('Error Call:', error);
          });
      } else {
        console.log('Номер телефона не заполнен');
        // form.querySelector('input[name="telephone"]').classList.add('has-error');
      }
    }

    function submitForm(formData, formElement) {
      ajaxRequest($(formElement).data('action'), $(formElement).data('method'), formData, function(response) {
        if (window.verification !== true) {
          eval(response.reachgoal);
          if ($(formElement).data('calculate-form-modal') !== undefined) {
            $(formElement).find('input[name="name"], input[name="telephone"]').val('');
          } else {
            $(formElement).trigger('reset');
          }

          $.modal.close();

          const modal = $('#success-modal');

          modal.modal({
            fadeDuration: 100,
          });
        }
      });
    }
    $('.js-form-validator').each(function() {
      $(this).validate({
        rules: {
          license: {
            // required: true,
            agreementValidator: true,
          },
          name: {
            required: true,
            minlength: 2,
          },
          telephone: {
            required: true,
            minlength: 18,
            ruPhone: true,
          },
          agreement: {
            required: true,
          },
        },
        messages: {
          license: 'Вы должны принять условия',
          name: 'Поле должно быть заполнено',
          agreement: 'Поле должно быть заполнено',
          telephone: 'Номер телефона должен содержать 11 цифр',
        },
        submitHandler: function(form) {
          const $form = $(form);

          // Сбор данных формы в объект
          const formData = {};
          $form.serializeArray().forEach(function(field) {
            formData[field.name] = field.value;
          });

          if (window.verification === true) {
            submitForm(formData, form);
            openVerificate(formData, form);
          } else if (window.captcha === true) {
            // Открытие капчи перед отправкой формы
            openCaptchaModal(formData, form);
          } else {
            // Отправка формы без капчи
            submitForm(formData, form);
          }

          return false;
        },
        errorElement: 'span',
      });
    });
  },
  runCalculator: () => new CreditCalculator(),
  runSpecsSelects: () => {
    $('.specs__select__header').each((index, el) => {
      $(el).on('click', (event) => {
        const header = $(event.currentTarget);
        let activeMethod = 'hide';

        if (header.hasClass('hidden')) {
          activeMethod = 'show';
          header.removeClass('hidden');
        } else {
          activeMethod = 'hide';
          header.addClass('hidden');
        }

        header.closest('.specs__select').find('.specs__list__item').each((_, item) => $(item)[activeMethod]());
        header.closest('.specs__select').find('.specs__select__item').each((_, item) => $(item)[activeMethod]());
      });
    });
  },
  runModals: () => {
    $('.js-open-modal').each((_, el) => {
      $(el).on('click', (event) => {
        event.preventDefault();
        const $target = $(event.currentTarget);
        const modalId = $target.data('modal-template');

        const modalBody = $(`#${modalId}`).modal({
          fadeDuration: 100,
        });

        if ($target.data('modal-type') === 'feedback') {
          modalBody.find('.modal-title').text($target.data('modal-model'));
          modalBody.find('.modal-user').text($target.data('modal-user'));
          modalBody.find('.modal-rating').text($target.data('modal-rating'));
          modalBody.find('.modal-text').text($target.data('modal-text'));
          modalBody.find('.modal-date').text($target.data('modal-date'));
          modalBody.find('.modal-attachments');
        }
      });
    });
    $('.modal').on('modal:open', () => {
      $('body').addClass('body-offset');
    });
    $('.modal').on('modal:close', () => {
      $('body').removeClass('body-offset');
    });
  },
  runVideoSelect: () => {
    $('.feedback-video__item').each((_, el) => {
      $(el).on('click', (event) => {
        $('.feedback-video__item').removeClass('selected');
        $(event.currentTarget).addClass('selected');
        $('.feedback-video__desc .feedback__user__name').text($(event.currentTarget).find('.feedback-video__item__username').text());
        $('.feedback-video__desc .feedback__user__desc').text($(event.currentTarget).find('.feedback-video__model-name').text());
      });
    });
  },
  runOfferBanner: () => {
    const isHidden = window.sessionStorage.getItem('isOfferBannerHidden');

    const timer = new TimerOffer('.offer-banner__timer');
    timer.start(); // Это вызовет countdownTimer() и начнет обновление каждую секунду

    if (!isHidden) {
      $('.offer-banner__section').show();
    }

    $('.offer-banner__close').on('click', () => {
      window.sessionStorage.setItem('isOfferBannerHidden', 'true');
      $('.offer-banner__section').hide();
    });
  },
  runCallbackWidget: () => new CallbackWidget('var(--blue-main)', () => $('#callback-modal').modal({ fadeDuration: 100 })),
  runCompare: () => {
    $('#clear-compare-list').on('click', () => {
      $('.compare__item').remove();
      $('.parameter__item').remove();
      $('#compare-list-count').text(0);
      $.cookie('compare', []);
    });

    $('.redirect-to-compare').on('click', () => {
      window.location.href = '/compare';
    });

    $('.compare__item__cross').on('click', (event) => {
      const target = $(event.currentTarget);
      const carItem = target.closest('.compare__item');
      const compareId = carItem.data('compare-id');
      let compare = $.cookie('compare') == null ? $.cookie('compare', []) : $.cookie('compare').split(',');

      compare = compare.filter((el) => +el !== +compareId);
      $(`[data-compare-id="${compareId}"]`).remove();

      $('#compare-list-count').text(compare.length);
      $.cookie('compare', compare);
    });

    $(document).on('click', (event) => {
      event.stopPropagation();
      if (!$(event.target).closest('.car-item__compare__icon').length) {
        $('.car-item__compare__info').removeClass('active');
      }
    });

    $('.car-item__compare__info').on('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });

    if ($.cookie('compare') == null) {
      $.cookie('compare', []);
    }

    $('.remove-from-compare').on('click', (event) => {
      const target = $(event.currentTarget);
      const icon = target.closest('.car-item__compare__icon');
      const id = icon.data('compare-id');

      let compare = $.cookie('compare').split(',');
      compare = $.grep(compare, function(n) { return (n === 0 || n) && n !== ''; });
      compare = new Set(compare);
      compare.delete(String(id));

      icon.removeClass('active');
      $('.compare-added-count').text(`${compare.size} авто`);

      $.cookie('compare', Array.from(compare));
    });

    $('.car-item__compare__icon').on('click', (event) => {
      event.preventDefault();
      const target = $(event.currentTarget);
      const compareItemInfo = target.find('.car-item__compare__info');
      const id = target.data('compare-id');
      let compare = $.cookie('compare').split(',');
      compare = $.grep(compare, function(n) { return (n === 0 || n) && n !== ''; });
      compare = new Set(compare);
      $('.car-item__compare__info').removeClass('active');

      if (target.hasClass('active') && compareItemInfo.hasClass('active')) {
        compareItemInfo.removeClass('active');
      } else {
        compare.add(String(id));
        $('.compare-added-count').text(`${compare.size} авто`);
        target.addClass('active');
        compareItemInfo.addClass('active');
      }

      $.cookie('compare', Array.from(compare));
    });
  },
  complectationModal: () => {
    let isComplectationForm = false;
    const $activeTab = $('.complectation__modal__tabs__content.active');

    if ($activeTab.find('.complectation__modal__model__item').length > 1) {
      $activeTab.find('.complectatiom__modal__model__pagination').addClass('shown');
    } else {
      $activeTab.find('.complectatiom__modal__model__pagination').removeClass('shown');
    }

    // Делегирование для swiper
    $(document).on('click', '.js-complectation-modal-swiper', (event) => {
      const index = $(event.currentTarget).index();
      $(event.currentTarget).addClass(`js-complectation-modal-swiper-${index}`);
      new Swiper(`.js-complectation-modal-swiper-${index}`, {
        slidesPerView: 1,
        spaceBetween: 36,
        modules: [Pagination, Navigation],
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
          lockClass: 'swiper-hide-pagination',
        },
        navigation: {
          enabled: true,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          lockClass: 'swiper-hide-pagination',
        },
      });
    });

    // Кнопка выбора комплектации
    $(document).on('click', '.js-choose-complectation', () => {
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-2').css('display', 'flex');
    });

    // Кнопки навигации
    $(document).on('click', '.complectation__modal__button-next-2', () => {
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-3').css('display', 'flex');
      isComplectationForm = true;
    });

    $(document).on('click', '.complectation__modal__button-prev-2', () => {
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-1').css('display', 'flex');
    });

    $(document).on('click', '.complectation__modal__button-prev-3', (event) => {
      event.preventDefault();
      $('.complectation__model__step').css('display', 'none');
      $('.complectation__model__step-2').css('display', 'flex');
    });

    // Кнопка подтверждения
    $(document).on('click', '.complectation__modal__confirm', () => {
      $('.complectation__modal__container').fadeOut();
    });

    $(document).on('click', '.complectation__modal__close', () => {
      $('.complectation__modal__container').fadeOut();
      $('body').css('overflow', 'auto');
    });

    // Обработка табов
    $(document).on('click', '.complectation__modal__tabs__item', (event) => {
      $('.complectation__modal__tabs__item').removeClass('active');
      $('.complectation__modal__tabs__content').removeClass('active');
      const tabId = $(event.currentTarget).data('tab-id');
      $(event.currentTarget).addClass('active');

      const currentTab = $(`[data-tab-id='${tabId}']`);
      currentTab.addClass('active');
      if (currentTab.find('.complectation__modal__model__item').length > 1) {
        currentTab.find('.complectatiom__modal__model__pagination').addClass('shown');
      } else {
        currentTab.find('.complectatiom__modal__model__pagination').removeClass('shown');
      }
    });

    // Информация о модели
    $(document).on('click', '.complectation__modal__model__info-button', (event) => {
      const target = event.currentTarget;
      const slideId = $(target).data('slide-id');
      const infoContainer = $(`div.complectation__modal__model__info-container[data-slide-id="${slideId}"]`);

      if (!infoContainer.hasClass('active')) {
        infoContainer.addClass('active');
        const targetRect = target.getBoundingClientRect();
        const containerRect = infoContainer[0].getBoundingClientRect();

        infoContainer.css({
          bottom: '50px',
          left: `${targetRect.x - containerRect.x}px`,
        });
      } else {
        infoContainer.removeClass('active');
        infoContainer.css({ bottom: '0', left: '0' });
      }
    });
  },
  runSummary: () => {
    $('.js-open-summary').on('click', (event) => {
      event.stopPropagation();
      const target = $(event.currentTarget);
      target.closest('.modification-details').find('.specs__container').toggleClass('active');
    });
  },
  loadFooter: () => {
    function fetchTemplate(template, data, container, callback) {
      $.ajax({
        url: '/ajax-get-template-fronend',
        method: 'GET',
        data: { template, ...data },
        success: function(response) {
          container.html(response);
          if (callback) callback(null, response); // Передаем ответ в callback
        },
        error: function(xhr, status, error) {
          console.error(error);
          if (callback) callback(error); // Передаем ошибку в callback
        },
      });
    }
    fetchTemplate('ajax-footer', {}, $('.footer__contents__bottom-text'));
  },
};

window.app.runSummary();
window.app.complectationModal();
window.app.runVideoSelect();
window.app.runCalculator();
window.app.runFormsValidation();
window.app.runColors();
window.app.runFancybox();
window.app.runTabs();
window.app.runMasks();
window.app.runSwiper();
window.app.runTimers();
window.app.runListeners();
window.app.runFindByMark();
window.app.runLazy();
window.app.runSelect2();
window.app.runSpecsSelects();
window.app.runModals();
window.app.runOfferBanner();
window.app.runCallbackWidget();
window.app.runCompare();
window.app.compareButtonInit();
window.app.loadFooter();
