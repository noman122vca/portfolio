import { test, describe } from 'node:test';
import assert from 'node:assert';
import { defaultPortfolioItems } from '../src/data/portfolioData.js';
import { profileData } from '../src/data/profileData.js';
import { cvData } from '../src/data/cvData.js';
import { asSunnahData, nsdaData } from '../src/data/trainingData.js';
import { translations } from '../src/data/translations.js';

describe('MD EFTEKAR HOSSEN NOMAN Portfolio - Integrity Test Suite', () => {
  test('Profile Data integrity', () => {
    assert.strictEqual(profileData.name, 'Md. Eftekar Hossen Noman');
    assert.strictEqual(profileData.officialName, 'Md. Eftekar Hossen Noman');
    assert.ok(profileData.phone.includes('01619-042379'));
    assert.ok(profileData.email.includes('eftekarhossennoman@gmail.com'));
    assert.strictEqual(profileData.github, '@noman122vca');
    assert.strictEqual(profileData.githubLink, 'https://github.com/noman122vca');
    assert.strictEqual(profileData.youtube, '@Nomancreative-17');
    assert.strictEqual(profileData.youtubeLink, 'https://www.youtube.com/@Nomancreative-17');
    assert.strictEqual(profileData.facebookLink, 'https://www.facebook.com/share/1GJsGoRt3n/');
    assert.strictEqual(profileData.behanceLink, 'https://www.behance.net/mdeftehossin');
    assert.strictEqual(profileData.linkedinLink, 'https://www.linkedin.com/in/md-eftekhar-hossen-noman-874b50444/');
  });

  test('Portfolio Items integrity', () => {
    assert.ok(Array.isArray(defaultPortfolioItems));
    assert.strictEqual(defaultPortfolioItems.length, 17, 'Should contain 17 default items');

    const videoItems = defaultPortfolioItems.filter((i) => i.mediaType === 'video');
    const graphicItems = defaultPortfolioItems.filter((i) => i.mediaType === 'graphic');

    assert.strictEqual(videoItems.length, 4, 'Should have 4 authentic Facebook video productions');
    assert.strictEqual(graphicItems.length, 13, 'Should have 13 graphic design works');
    assert.ok(videoItems.every((v) => v.mediaUrl.includes('facebook.com')), 'All video productions must be authentic Facebook links');
    assert.ok(graphicItems.some((g) => g.externalUrl && g.externalUrl.includes('facebook.com')), 'Should include authentic Facebook graphic works');

    defaultPortfolioItems.forEach((item) => {
      assert.ok(item.id, 'Item must have an id');
      assert.ok(item.title, 'Item must have a title');
      assert.ok(item.category, 'Item must have a category');
      assert.ok(['video', 'graphic'].includes(item.mediaType), 'Invalid mediaType');
      assert.ok(item.thumbnailUrl, 'Item must have a thumbnailUrl');
      assert.ok(item.mediaUrl, 'Item must have a mediaUrl');
      assert.ok(Array.isArray(item.tags), 'Tags must be an array');
    });
  });

  test('CV Data integrity', () => {
    assert.strictEqual(cvData.fullName, 'Md. Eftekar Hossen Noman');
    assert.strictEqual(cvData.displayName, 'Md. Eftekar Hossen Noman');
    assert.strictEqual(cvData.email, 'eftekarhossennoman@gmail.com');
    assert.ok(Array.isArray(cvData.education));
    assert.ok(cvData.education.length >= 2);
    assert.ok(cvData.education.some(e => e.degree.includes('Takmil')));
    assert.ok(cvData.education.some(e => e.degree.includes('Fazilat')));
    assert.ok(Array.isArray(cvData.coreCompetencies));
    assert.ok(cvData.coreCompetencies.length >= 4);
    assert.ok(Array.isArray(cvData.references));
    assert.strictEqual(cvData.references.length, 2);
    assert.strictEqual(cvData.pdfDownloadUrl, './md-eftekar-hossen-noman-cv.pdf');
  });

  test('Institutional Certifications integrity', () => {
    assert.strictEqual(asSunnahData.institute, 'As-Sunnah Skill Development Institute');
    assert.strictEqual(asSunnahData.batch, 'Batch 37');
    assert.strictEqual(nsdaData.institute, 'National Skills Development Authority (NSDA)');
    assert.ok(nsdaData.badge.includes('Level 3'));
  });

  test('Bilingual Translations integrity', () => {
    assert.ok(translations.en, 'Must have English dictionary');
    assert.ok(translations.bn, 'Must have Bengali dictionary');

    const sections = ['nav', 'hero', 'about', 'skills', 'portfolio', 'profiles', 'contact', 'footer'];
    sections.forEach((sec) => {
      assert.ok(translations.en[sec], `Missing EN section: ${sec}`);
      assert.ok(translations.bn[sec], `Missing BN section: ${sec}`);
    });

    assert.strictEqual(translations.en.nav.home, 'Home');
    assert.strictEqual(translations.bn.nav.home, 'হোম');
  });

  test('YouTube URL parser logic', () => {
    function extractYouTubeId(url) {
      if (!url) return null;
      const trimmed = url.trim();
      const m1 = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (m1) return m1[1];
      const m2 = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
      if (m2) return m2[1];
      const m3 = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (m3) return m3[1];
      const m4 = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (m4) return m4[1];
      return null;
    }

    assert.strictEqual(extractYouTubeId('https://youtu.be/KOrldftEmLU?si=mfcfdH59sEs5ZT2I'), 'KOrldftEmLU');
    assert.strictEqual(extractYouTubeId('https://www.youtube.com/watch?v=6aKkTkBnzxQ'), '6aKkTkBnzxQ');
    assert.strictEqual(extractYouTubeId('https://youtube.com/shorts/duEYB2KJlLc'), 'duEYB2KJlLc');
    assert.strictEqual(extractYouTubeId('https://www.youtube.com/embed/X5IFszf8yk8'), 'X5IFszf8yk8');
    assert.strictEqual(extractYouTubeId('https://invalid-url.com'), null);
  });

  test('Facebook URL detector and embed resolver logic', () => {
    function isFacebookVideo(url) {
      if (!url) return false;
      const trimmed = url.trim();
      return /facebook\.com|fb\.watch/i.test(trimmed);
    }

    function getFacebookEmbedUrl(url) {
      if (!isFacebookVideo(url)) return null;
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url.trim())}&show_text=0&autoplay=1`;
    }

    assert.strictEqual(isFacebookVideo('https://www.facebook.com/watch/?v=123456789'), true);
    assert.strictEqual(isFacebookVideo('https://fb.watch/xYz12345/'), true);
    assert.strictEqual(isFacebookVideo('https://www.facebook.com/reel/987654321'), true);
    assert.strictEqual(isFacebookVideo('https://youtube.com/watch?v=12345678901'), false);

    const embedUrl = getFacebookEmbedUrl('https://fb.watch/xYz12345/');
    assert.strictEqual(embedUrl.includes('plugins/video.php?href='), true);
    assert.strictEqual(embedUrl.includes(encodeURIComponent('https://fb.watch/xYz12345/')), true);
  });
});

