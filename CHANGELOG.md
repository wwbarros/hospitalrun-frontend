# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0-alpha.2](https://github.com/HospitalRun/hospitalrun-frontend/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-02-15)


### Features

* **appointmentslist:** add an appointments tab to the patient view ([deee00e](https://github.com/HospitalRun/hospitalrun-frontend/commit/deee00e52f2bab2fec8518d4e8cdfa6f67c2cf75)), closes [#1769](https://github.com/HospitalRun/hospitalrun-frontend/issues/1769)
* **edit patient:** implement Edit Patient functionality ([8e3355f](https://github.com/HospitalRun/hospitalrun-frontend/commit/8e3355f2124186b6ead1a710abb3010695e51abf))
* **edit patient:** moved buttons out of GeneralInformation ([403e49f](https://github.com/HospitalRun/hospitalrun-frontend/commit/403e49feb130d16718fb014e1a27ea218915bb7e))
* **env:** adds hospitalrun server information ([7f0fe7f](https://github.com/HospitalRun/hospitalrun-frontend/commit/7f0fe7fa47d0705d585f7ca15d4796e1c90c2f16))
* **env:** change env variable names ([cddc812](https://github.com/HospitalRun/hospitalrun-frontend/commit/cddc812ae5bd1f1b05e7310b5a504b51ecee1981))
* add documentation folder ([d22300e](https://github.com/HospitalRun/hospitalrun-frontend/commit/d22300e8a56be56c7edef6f914d7b9c5381aea7f))
* **navigation:** navigate to patients profile on related person click ([c6acecc](https://github.com/HospitalRun/hospitalrun-frontend/commit/c6acecc3c89b0aeb96fa6c6fea15b316ee0669a2)), closes [#1763](https://github.com/HospitalRun/hospitalrun-frontend/issues/1763)
* **relatedpersontab:** add cursor icon to related persons list ([ef7e19c](https://github.com/HospitalRun/hospitalrun-frontend/commit/ef7e19cabf596afd08d4e15449a96285541149d1)), closes [#1792](https://github.com/HospitalRun/hospitalrun-frontend/issues/1792)
* **test:** add navigate to related person profile onclick test ([29fbffe](https://github.com/HospitalRun/hospitalrun-frontend/commit/29fbffec0848f0e0fed54b133513cfb1471ddacb)), closes [#1792](https://github.com/HospitalRun/hospitalrun-frontend/issues/1792)


### Bug Fixes

* **patient-slice.ts:** conditionally render family name and suffix ([d20e294](https://github.com/HospitalRun/hospitalrun-frontend/commit/d20e294340a155cb90138ea9bf5210e6e697ea71)), closes [#1818](https://github.com/HospitalRun/hospitalrun-frontend/issues/1818)
* **patients:** add test for displaying No Related Persons warning ([da6bdb1](https://github.com/HospitalRun/hospitalrun-frontend/commit/da6bdb19e3609e1d8fca6d08349c71814162f536)), closes [#1789](https://github.com/HospitalRun/hospitalrun-frontend/issues/1789)
* **patients:** internationalize No Related Persons warning & loading ([099e50d](https://github.com/HospitalRun/hospitalrun-frontend/commit/099e50d846e1574dff2b28aafd77b7d01c4da955)), closes [#1789](https://github.com/HospitalRun/hospitalrun-frontend/issues/1789)
* **patients:** replace "Loading..." text with Spinner component ([e6ce4cb](https://github.com/HospitalRun/hospitalrun-frontend/commit/e6ce4cb979d3f3cd7c3704490ad4251955f4922f)), closes [#1789](https://github.com/HospitalRun/hospitalrun-frontend/issues/1789)
* **patients:** stop "Loading..." when patient has no related persons ([e513b17](https://github.com/HospitalRun/hospitalrun-frontend/commit/e513b172e25f24126969564a0e7d4f421758e626)), closes [#1789](https://github.com/HospitalRun/hospitalrun-frontend/issues/1789)
* **persons:** replace "No related persons" message with a warning ([c156b5b](https://github.com/HospitalRun/hospitalrun-frontend/commit/c156b5bba25b008be3bd7d11cd393e2f12fb49cb)), closes [#1789](https://github.com/HospitalRun/hospitalrun-frontend/issues/1789)
* **prettier:** changes endofline option ([1fbd965](https://github.com/HospitalRun/hospitalrun-frontend/commit/1fbd9658b4869d7f98b4ae918e731012e4b4b9a3))
* **test:** add related test, and revert test changes ([9bead70](https://github.com/HospitalRun/hospitalrun-frontend/commit/9bead7078f8ea94680f24d865f576ae786ce5178)), closes [#1792](https://github.com/HospitalRun/hospitalrun-frontend/issues/1792)
* **test:** remove extra whitespace ([155b4e9](https://github.com/HospitalRun/hospitalrun-frontend/commit/155b4e939151beb994808bae22dd2cd74845da39)), closes [#1792](https://github.com/HospitalRun/hospitalrun-frontend/issues/1792)
* **test:** remove unused import ([fc3a78d](https://github.com/HospitalRun/hospitalrun-frontend/commit/fc3a78d70f285a120a9d0f690320d6c6fa5e5696)), closes [#1792](https://github.com/HospitalRun/hospitalrun-frontend/issues/1792)

## 2.0.0-alpha.1 (2020-02-07)


### ⚠ BREAKING CHANGES

* **frontend:** update components package changing some interfaces
* This module no longer supports Node.js 0.10

### Features

* add analyze script ([3b60961](https://github.com/HospitalRun/hospitalrun-frontend/commit/3b60961f3875ca763893f1be2d63f304a83dd9d1))
* **appointments:** add ability to view appointment ([93bde54](https://github.com/HospitalRun/hospitalrun-frontend/commit/93bde5463653a0f0784170bc5ce7f0943d7cda76))
* **appointments:** add create appointment functionality ([723bec3](https://github.com/HospitalRun/hospitalrun-frontend/commit/723bec3b05184631fd611f0a9c65b495974f289f))
* **appointments:** adds ability to display appointments on calendar ([842b9ee](https://github.com/HospitalRun/hospitalrun-frontend/commit/842b9eed442ebf301da58fc81855c60905633b1b))
* **appointments:** adds new appointment route ([86c9a32](https://github.com/HospitalRun/hospitalrun-frontend/commit/86c9a325c57176e89b93aa43c888f5bcb0156ae8))
* **appointments:** adds screen to view appointment ([f31e852](https://github.com/HospitalRun/hospitalrun-frontend/commit/f31e852e83b130e024d212dd5d092c6c24c6d77e))
* **appointments:** display patient full name for appointments ([9bdb933](https://github.com/HospitalRun/hospitalrun-frontend/commit/9bdb933b066f45f3c7f594d0ebdf5415c2b6d88b))
* **appointments:** refactored appointment detail form to own component ([a0be28b](https://github.com/HospitalRun/hospitalrun-frontend/commit/a0be28b129ea67deb7d3934db08d68bd745bfdf1))
* **db:** adds remote couchdb ([d8e7a55](https://github.com/HospitalRun/hospitalrun-frontend/commit/d8e7a55b51170ca4484bcc252d7b5177c2a0172d))
* **i18n:** add internationalization ([0f69f84](https://github.com/HospitalRun/hospitalrun-frontend/commit/0f69f8466855ea5435ba31d24a93d7d44c39ea83))
* **init:** add basic routing ([c220b96](https://github.com/HospitalRun/hospitalrun-frontend/commit/c220b9667bf25569a73b9859c622d2cfd39fe5e2))
* **init:** add dashboard view, and useTitle hook ([d3835d6](https://github.com/HospitalRun/hospitalrun-frontend/commit/d3835d69e2753eaa539fc61c789b4969178edf23))
* **init:** add hospitalrun/components to package.json ([078dcf9](https://github.com/HospitalRun/hospitalrun-frontend/commit/078dcf9d7b2611fc4ea8546479194664a88c3276))
* **init:** add permissions for routes ([7a19200](https://github.com/HospitalRun/hospitalrun-frontend/commit/7a19200c2f6640d72737b156e3c994d1595cfdcd))
* **init:** add redux ([183d65c](https://github.com/HospitalRun/hospitalrun-frontend/commit/183d65cc837e2fb8539564dbf06c474b242cf611))
* **init:** cleans up interfaces for PatientForm ([2063b20](https://github.com/HospitalRun/hospitalrun-frontend/commit/2063b20b60b44f42ae9c92a1a17a69d4b94fac26))
* **init:** cleans up update patient code ([d6ab622](https://github.com/HospitalRun/hospitalrun-frontend/commit/d6ab6222395c93fa9cd5db2e483c81110f5d6295))
* **init:** creates a generic repository class and refactors patient db ([24940b4](https://github.com/HospitalRun/hospitalrun-frontend/commit/24940b4e80315f94cb92bfcbf34300cf8ddc30ec))
* **init:** creates a very simple pouchdb client ([c6d712b](https://github.com/HospitalRun/hospitalrun-frontend/commit/c6d712b6bd2fb74adc61d9de88e58673418bdcb4))
* **init:** fix warnings comming from manifest ([1dca924](https://github.com/HospitalRun/hospitalrun-frontend/commit/1dca9249c1d440cabb79784e8570d21ef106c70c))
* **init:** mock pouchdb ([7373e8d](https://github.com/HospitalRun/hospitalrun-frontend/commit/7373e8de447e79d6a8998736436a1c8396241f0b))
* **init:** remove warnings in tests ([3d7be47](https://github.com/HospitalRun/hospitalrun-frontend/commit/3d7be47d1d691b9ef547937a4391c8da1cc39894))
* **init:** rename store/store.ts to store/index.ts ([cd861e3](https://github.com/HospitalRun/hospitalrun-frontend/commit/cd861e3adb2c15ce53ce3c69676f7e5c0eeff6ec))
* **init:** update NewPatient to not use Patient slice ([c4ced2c](https://github.com/HospitalRun/hospitalrun-frontend/commit/c4ced2c157264089f69c6f53b3f89ced69b50f78))
* **init:** update to use models ([273b000](https://github.com/HospitalRun/hospitalrun-frontend/commit/273b000537ca45825f7c1c71236431a74c9ad7b6))
* **patientform:** added patient form error handling ([c17aa0a](https://github.com/HospitalRun/hospitalrun-frontend/commit/c17aa0aef887d76fd03ba3bfd7fcc8a4a464fdca))
* **patients:** add ability to add and display related persons ([4516e89](https://github.com/HospitalRun/hospitalrun-frontend/commit/4516e892ce7da97bf777f204ae3e1a826c8d0fa4))
* **patients:** add ability to store full name ([36ababf](https://github.com/HospitalRun/hospitalrun-frontend/commit/36ababf742141e5961807bd1809b34b593235165))
* **patients:** add ability to view a patient ([a73e7f0](https://github.com/HospitalRun/hospitalrun-frontend/commit/a73e7f086b4cd7bb22f7963ed3e3345494c590f4))
* **patients:** add error message for missing required fields ([148b220](https://github.com/HospitalRun/hospitalrun-frontend/commit/148b220cd7bbd43ffd71c15fde086b85c233c1ec))
* **patients:** add permission check to add button ([1a4e5af](https://github.com/HospitalRun/hospitalrun-frontend/commit/1a4e5afa527a01d19e76823c6df0948073d0d349))
* **patients:** add saveOrUpdate function in repositories ([c9a6913](https://github.com/HospitalRun/hospitalrun-frontend/commit/c9a6913800cf80bb88b8a39b2242d4b6080d79e0))
* **patients:** add success message when patient is created successfully ([3c2b2ae](https://github.com/HospitalRun/hospitalrun-frontend/commit/3c2b2ae978a856037d66e3d32fda4b3c3e0f5836)), closes [#1701](https://github.com/HospitalRun/hospitalrun-frontend/issues/1701)
* **patients:** add tabs in patient view ([3eea135](https://github.com/HospitalRun/hospitalrun-frontend/commit/3eea135c9b643a181c54da37a0fb70f55571f96d))
* **patients:** add tabs in patient view ([582770e](https://github.com/HospitalRun/hospitalrun-frontend/commit/582770ec573718bc065a02cc216c434487bb8953))
* **patients:** add tests for patients-slice and move files ([c2ef440](https://github.com/HospitalRun/hospitalrun-frontend/commit/c2ef440425b15baa64a262f64d0d81d355856294))
* **patients:** add update patient reducers/actions ([687d125](https://github.com/HospitalRun/hospitalrun-frontend/commit/687d125bb139d29dd2d6c281363ddc46130fb176))
* **patients:** add very simple create patient page ([bb94ef0](https://github.com/HospitalRun/hospitalrun-frontend/commit/bb94ef0cf5e4461a4d84515cc695db66fd229fc7))
* **patients:** add very simple way of displaying all patients ([927b5bc](https://github.com/HospitalRun/hospitalrun-frontend/commit/927b5bc8ea606ad8a70c2603d2afbcae99744643))
* **patients:** adds a friendlyId ([ad9fb13](https://github.com/HospitalRun/hospitalrun-frontend/commit/ad9fb133b2f890b89ed507dcd81934a42aef0d30)), closes [#1709](https://github.com/HospitalRun/hospitalrun-frontend/issues/1709)
* **patients:** adds ability to approximate age when creating patient ([c8eba48](https://github.com/HospitalRun/hospitalrun-frontend/commit/c8eba48017f6dc27de32f3096a45037fa775c046))
* **patients:** adds ability to search by patient friendlyId ([a519550](https://github.com/HospitalRun/hospitalrun-frontend/commit/a51955046ae2f8841b5561fa01800698af2cfdf2)), closes [#1709](https://github.com/HospitalRun/hospitalrun-frontend/issues/1709)
* **patients:** adds abilty to search for patients by full name ([4468b59](https://github.com/HospitalRun/hospitalrun-frontend/commit/4468b59b5e1a3a6c13bacd56fa479cebf32f6954)), closes [#1707](https://github.com/HospitalRun/hospitalrun-frontend/issues/1707)
* **patients:** adds functionality to save patient ([c6159af](https://github.com/HospitalRun/hospitalrun-frontend/commit/c6159af39afb6aa325191e06229908d5e9479479))
* **patients:** adds tests for new patients form, inputs, and route" ([a7bf838](https://github.com/HospitalRun/hospitalrun-frontend/commit/a7bf8381a02c541496d2f30efbfafb15c4f145d5))
* **patients:** call findAll if search string is empty ([3ab5d13](https://github.com/HospitalRun/hospitalrun-frontend/commit/3ab5d1325a95983b566ed4e7f68e7c78ddad7836))
* **patients:** change search to be more of a fuzzy search ([7ebedd1](https://github.com/HospitalRun/hospitalrun-frontend/commit/7ebedd1ec37cb003ccef45995d1c8c6c49d43c66))
* **patients:** change the new patients route ([9072ac9](https://github.com/HospitalRun/hospitalrun-frontend/commit/9072ac910538c9d7425b4f1a96db8bfd6f17e740))
* **patients:** changes id to be a timestamp instead of random" ([bd54bb7](https://github.com/HospitalRun/hospitalrun-frontend/commit/bd54bb72348303e9ca8e9b1a2b8726688d77ef9a))
* **patients:** fix routing after successfully creating new patient ([d23f860](https://github.com/HospitalRun/hospitalrun-frontend/commit/d23f860ce7e71cf892e7584e2eef6de0d4c79a70))
* **patients:** flatten name object ([9bc4365](https://github.com/HospitalRun/hospitalrun-frontend/commit/9bc43653ac1526ff7e432bd3d5a99fd1a16107a6))
* **patients:** move date of birth information up a line ([bf45cce](https://github.com/HospitalRun/hospitalrun-frontend/commit/bf45cce152ec633efcc60bab12cdd46768ef3d99))
* **patients:** pass is approximate date of birth flag ([281674c](https://github.com/HospitalRun/hospitalrun-frontend/commit/281674cbb3d9caff84ce17f8992101b7d351ff46))
* **patients:** refactor name and contact information to  own interface ([26543af](https://github.com/HospitalRun/hospitalrun-frontend/commit/26543af294581974d02bf528c3acb69666c69bbf))
* **patients:** remove delete button that was there for testing ([3fbbfd4](https://github.com/HospitalRun/hospitalrun-frontend/commit/3fbbfd458175d06e8b98f941e91fcd744d990d92))
* **patients:** use button toolbar ([bf681cd](https://github.com/HospitalRun/hospitalrun-frontend/commit/bf681cd6e0eff9b4da6e301991f7eb1fee2e31c6))
* **patients:** use date-fns in favor of luxon ([97cf263](https://github.com/HospitalRun/hospitalrun-frontend/commit/97cf2636e987bf219f7a8836aaf04e63c98b59be))
* **patients:** use hospital run date picker ([9758986](https://github.com/HospitalRun/hospitalrun-frontend/commit/97589861aa4fc5e98052f7946befcff8b9c718fb))
* **patients:** use panels for grouping content in view patient ([452419c](https://github.com/HospitalRun/hospitalrun-frontend/commit/452419c8dccce23aa12df1518e2e641031b63d85))
* **patients:** use patient typeahead to find related person ([7565b5a](https://github.com/HospitalRun/hospitalrun-frontend/commit/7565b5ab071874eb6dae8a2c32b6b558698cacd3))
* **pwa:** adds pwa support ([e621489](https://github.com/HospitalRun/hospitalrun-frontend/commit/e6214893e5f7c869a8db388988b8bd255324b491)), closes [#1711](https://github.com/HospitalRun/hospitalrun-frontend/issues/1711)
* **scheduling:** add scheduling dropdown to navbar ([2375481](https://github.com/HospitalRun/hospitalrun-frontend/commit/2375481d2320338c9ba90e49a82f57ac4d6045e2))
* **scheduling:** add scheduling module and appointments ([02702bc](https://github.com/HospitalRun/hospitalrun-frontend/commit/02702bce291c03023e2b7a821cc970f89c5cd3a9))
* **toolchain:** adds commit script ([3fc9c2f](https://github.com/HospitalRun/hospitalrun-frontend/commit/3fc9c2fc661104f898d1533c057ea3f0388965ff))


### Bug Fixes

* **build:** add test after lint in precommit husky hook ([5e7c410](https://github.com/HospitalRun/hospitalrun-frontend/commit/5e7c41002a4e3afc160798264bf88498808f155f)), closes [#1775](https://github.com/HospitalRun/hospitalrun-frontend/issues/1775)
* **build:** fix prettier/eslint config ([e041e22](https://github.com/HospitalRun/hospitalrun-frontend/commit/e041e221bb09bcec280e17b14138d5d311ebd8c5)), closes [#1782](https://github.com/HospitalRun/hospitalrun-frontend/issues/1782)
* **build:** modify husky and lint-staged config to fix lint issue ([66076e6](https://github.com/HospitalRun/hospitalrun-frontend/commit/66076e63c39826f6099e439433f843a864ce255c)), closes [#1775](https://github.com/HospitalRun/hospitalrun-frontend/issues/1775)
* **build:** remove extra test ([9b5d70b](https://github.com/HospitalRun/hospitalrun-frontend/commit/9b5d70b2a0575fff2ee6afb40b0b42135b88f90e)), closes [#1780](https://github.com/HospitalRun/hospitalrun-frontend/issues/1780)
* **build:** test precommit config ([a293884](https://github.com/HospitalRun/hospitalrun-frontend/commit/a2938847b5196b6d9dee2864106aa983df1773b9)), closes [#1782](https://github.com/HospitalRun/hospitalrun-frontend/issues/1782)
* **dep:** fix missing react-bootstrap dependency ([500c680](https://github.com/HospitalRun/hospitalrun-frontend/commit/500c680795a3b98c7b3e99a3b35058848c8c3a5e))
* **docs:** fixes badge url on readme ([db127b6](https://github.com/HospitalRun/hospitalrun-frontend/commit/db127b6b3d4587fdb49fe568b74841fbdf3e74f3))
* **frontend:** make onclick undefined to avoid lint issue ([25ddab7](https://github.com/HospitalRun/hospitalrun-frontend/commit/25ddab75d0c5e1e56ff35a085f56f43d675dd10b)), closes [#1781](https://github.com/HospitalRun/hospitalrun-frontend/issues/1781)
* **frontend:** update navbar component to match new format ([ade4abf](https://github.com/HospitalRun/hospitalrun-frontend/commit/ade4abffd62411aa461f90eeddc85ab0df4b23b6)), closes [#1781](https://github.com/HospitalRun/hospitalrun-frontend/issues/1781)
* **hook:** improves eslint precommit hook ([639f122](https://github.com/HospitalRun/hospitalrun-frontend/commit/639f122b11e6eee2953d0ad40db6edbd22b82f61))
* **lint:** fixes eslint ([75e1756](https://github.com/HospitalRun/hospitalrun-frontend/commit/75e175665ef744cac1d6ea639e0a732a4c566d7b))
* **locales/de:** languageName ([1cfba70](https://github.com/HospitalRun/hospitalrun-frontend/commit/1cfba70a937ae0eced0baec836ac52cfb4373a76))
* **nav-sidebar:** current route highlighting ([357e4b5](https://github.com/HospitalRun/hospitalrun-frontend/commit/357e4b5679096ed53a628c8cc7b60e1b90196b78))
* **navbar:** fixes broken link to new patients in navbar ([e4cf64d](https://github.com/HospitalRun/hospitalrun-frontend/commit/e4cf64d44ce1c6b9baabff08cb86d557f7a5688c))
* **newpatientform.test.tsx:** fix to spacing according to lint rules ([55043fa](https://github.com/HospitalRun/hospitalrun-frontend/commit/55043fad76c5c0ab053941a866598a6d53619c4c))
* **package:** update electron-localshortcut to version 3.0.4 ([5e98e76](https://github.com/HospitalRun/hospitalrun-frontend/commit/5e98e760a0e3c39a74c238b7b1c7425b7efc7ec5))
* **patients:** fix 'Attempted to log TypeError: Cannot read property 'body' of null' warning ([2c439d6](https://github.com/HospitalRun/hospitalrun-frontend/commit/2c439d613af90ef1398d1bed7a4553a4b15ca6bf))
* **patients:** fix broken name display in view patient adn lsit patient ([8ff0ac9](https://github.com/HospitalRun/hospitalrun-frontend/commit/8ff0ac913f0cee0f8d738a7cfaee57b2722c350f))
* **patients:** fix issue with patient duplicating on update ([ae44b90](https://github.com/HospitalRun/hospitalrun-frontend/commit/ae44b903de2a1ecd7f4d8724f82f1a67ae38ca32))
* **patients:** fix typo in classnames ([c4f0c92](https://github.com/HospitalRun/hospitalrun-frontend/commit/c4f0c928509509db81513dd04b4e64034fbc7a9d))
* **patients:** makes patient search case insensitive ([4303b6c](https://github.com/HospitalRun/hospitalrun-frontend/commit/4303b6c3523576df8125980df98d81bb8512db20))
* **scss:** add node-sass ([0e7b0c7](https://github.com/HospitalRun/hospitalrun-frontend/commit/0e7b0c72c2efa7b00cf4b361065b2bd50e1e96a1))
* **test:** update navbar tests for component update ([7cd00d8](https://github.com/HospitalRun/hospitalrun-frontend/commit/7cd00d82a3693ec9984d9ef8b39f5e1a0807198f)), closes [#1782](https://github.com/HospitalRun/hospitalrun-frontend/issues/1782)
* add .idea/ default intellij folder to .gitignore ([67bcda3](https://github.com/HospitalRun/hospitalrun-frontend/commit/67bcda33f9730e933ff7264f76d19a89b431ec34))
* adjusted code as requests in pr and fixed linting errors ([59447dc](https://github.com/HospitalRun/hospitalrun-frontend/commit/59447dc391ed98b3a3c0ead3ede5e31448fc3c28))
* delete payments and line items when deleting invoices ([05527ae](https://github.com/HospitalRun/hospitalrun-frontend/commit/05527ae49db4c8a61fad38245e63b1f7a0fe2a6e))
* fixed edit operative plan title bug ([db469da](https://github.com/HospitalRun/hospitalrun-frontend/commit/db469da9a5eed20f74e7f139ab0b785a2af55abb))
* fixed edit operative plan title test ([51a6c3e](https://github.com/HospitalRun/hospitalrun-frontend/commit/51a6c3ecca1b80edecd5d5b887abc60885cf6c35))
* internationalization dubplicate fix & fix to translation json ([543cf74](https://github.com/HospitalRun/hospitalrun-frontend/commit/543cf741187b77cc1e92c4c956c14ddeeb59954e))
* internationalization dubplicate fix & fix to translation json ([6f54562](https://github.com/HospitalRun/hospitalrun-frontend/commit/6f545624835c254f5eedd728c643612571a2a283))
* lint build error fixes to newpatientform test file ([9bf8cef](https://github.com/HospitalRun/hospitalrun-frontend/commit/9bf8cefeb3051502e6314e250fe90ea42640c5ea))
* lint build error fixes to newpatientform test file{2} ([a5d625c](https://github.com/HospitalRun/hospitalrun-frontend/commit/a5d625c4f534cf6e7d340532bc98a76f6893bca4))
* small change to naming of json key in translation.json ([0edc07f](https://github.com/HospitalRun/hospitalrun-frontend/commit/0edc07fa5500d70ae9232f66f52eb701529cf612))
* **scss:** import scss from components library ([45cb83f](https://github.com/HospitalRun/hospitalrun-frontend/commit/45cb83f1712d2b7370388a7c9c269353a18914c4))
* **test:** adds coveralls like devdeps ([710c3c5](https://github.com/HospitalRun/hospitalrun-frontend/commit/710c3c5b0ddc500dfcd02df2c3ff58284177b8cb))
* **test:** fixes coveralls coverage ([9b321fa](https://github.com/HospitalRun/hospitalrun-frontend/commit/9b321fa0ba71e1eb2ad23cad8767a8358be411da))
* **test:** updates coveralls script ([324ca3b](https://github.com/HospitalRun/hospitalrun-frontend/commit/324ca3b5b2a965e6ad32fe1766716a6bcec640a2))
* **test:** updates coveralls script ([f8844ed](https://github.com/HospitalRun/hospitalrun-frontend/commit/f8844ed74345a6bf455bcfb28154ed03f21e6d51))
* **tests:** fix matchMediaMock issue when running tests ([2edfe1b](https://github.com/HospitalRun/hospitalrun-frontend/commit/2edfe1b247ec5d0e5d5e372e0facb82be535af3f))
* remove swap files inadverdently checked in ([9d2040d](https://github.com/HospitalRun/hospitalrun-frontend/commit/9d2040da45bf1e0a90d6468d4ab7d493e7a41e91))
* when deleting patient records, also delete appointments, payments, invoice line items and proc charges ([5939a73](https://github.com/HospitalRun/hospitalrun-frontend/commit/5939a738f3fce786dca84e32246236c4681767f4))


* drop support for Node.js 0.10 ([#782](https://github.com/HospitalRun/hospitalrun-frontend/issues/782)) ([c3e2dae](https://github.com/HospitalRun/hospitalrun-frontend/commit/c3e2dae5f3f16010a572a046697be9372169daa5))

# 1.0.0 (2019-10-15)


### Bug Fixes

* delete payments and line items when deleting invoices ([05527ae](https://github.com/HospitalRun/hospitalrun-frontend/commit/05527ae49db4c8a61fad38245e63b1f7a0fe2a6e))
* fixed edit operative plan title bug ([db469da](https://github.com/HospitalRun/hospitalrun-frontend/commit/db469da9a5eed20f74e7f139ab0b785a2af55abb))
* fixed edit operative plan title test ([51a6c3e](https://github.com/HospitalRun/hospitalrun-frontend/commit/51a6c3ecca1b80edecd5d5b887abc60885cf6c35))
* remove swap files inadverdently checked in ([9d2040d](https://github.com/HospitalRun/hospitalrun-frontend/commit/9d2040da45bf1e0a90d6468d4ab7d493e7a41e91))
* when deleting patient records, also delete appointsments, payments, invoice line items and proc charges ([5939a73](https://github.com/HospitalRun/hospitalrun-frontend/commit/5939a738f3fce786dca84e32246236c4681767f4))
* **docs:** fixes badge url on readme ([db127b6](https://github.com/HospitalRun/hospitalrun-frontend/commit/db127b6b3d4587fdb49fe568b74841fbdf3e74f3))
* **locales/de:** languageName ([1cfba70](https://github.com/HospitalRun/hospitalrun-frontend/commit/1cfba70a937ae0eced0baec836ac52cfb4373a76))
* **nav-sidebar:** current route highlighting ([357e4b5](https://github.com/HospitalRun/hospitalrun-frontend/commit/357e4b5679096ed53a628c8cc7b60e1b90196b78))
* **package:** update electron-localshortcut to version 3.0.4 ([5e98e76](https://github.com/HospitalRun/hospitalrun-frontend/commit/5e98e760a0e3c39a74c238b7b1c7425b7efc7ec5))


### chore

* drop support for Node.js 0.10 ([#782](https://github.com/HospitalRun/hospitalrun-frontend/issues/782)) ([c3e2dae](https://github.com/HospitalRun/hospitalrun-frontend/commit/c3e2dae5f3f16010a572a046697be9372169daa5))


### Features

* **toolchain:** adds commit script ([3fc9c2f](https://github.com/HospitalRun/hospitalrun-frontend/commit/3fc9c2fc661104f898d1533c057ea3f0388965ff))


### Performance Improvements

* **docker:** add `yarn` for faster dependency installs ([ae1ca43](https://github.com/HospitalRun/hospitalrun-frontend/commit/ae1ca43da091eb28bf62da92272cf204675ecbc7))


### BREAKING CHANGES

* This module no longer supports Node.js 0.10
