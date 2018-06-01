import viewports from '../fixtures/viewports.json'

/**
 * Tests
 * https://on.cypress.io/viewport
 */

describe('Document Test', () => {
  beforeEach(() => cy.visit(`/`))

  it('cy.document() - get the document object', function() {
    // https://on.cypress.io/document
    cy.document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8')
  })

  it('cy.title() - get the title', function() {
    // https://on.cypress.io/title
    cy.title().should('include', 'КотоСани. Первое в Сочи антикафе с котиками')
  })

  it(`Has exists viewport head meta`, () => {
    cy.get('meta[name=viewport]').should('have.attr', 'content')
  })
})

describe('Menu checks', () => {
  beforeEach(() => cy.viewport(767, 1024))

  it('Hamburger accessable', () => {
    cy.get('.hamburger').should('be.visible')
    cy.get('.js-header-nav').should('not.be.visible')
  })

  it('Menu open', () => {
    cy.get('.js-header-nav-trigger').click()
    cy.get('.js-header-nav')
      .should('be.visible')
      .and('have.class', 'is-open')
  })
})

// describe('Menu clickable', () => {
//   let navList

//   beforeEach(function() {
//     cy.viewport(767, 1024)
//     cy.get('.js-header-nav')
//       .find('a')
//       .as('links')
//   })

//   it('.then()', function() {
//     cy.get('@links').then(links => {
//       expect(links).to.have.length(links.length)

//       navList = [...Array(links.length).keys()]
//       navList.forEach(i => {
//         const link = links.eq(i)
//         expect(link).to.have.attr('href')
//         expect(link).to.contain(link[0].innerText)
//         // cy.get('@links').eq(i).click()

//         // cy.hash().should('eq', link.hash)
//       })
//       cy.log(navList)
//       cy.get('@links')
//         .eq(0)
//         .click()
//     })
//   })

//   /*it('Click by menu items', () => {
//     console.log(navList)
//     // cy.get('.js-header-nav').find('a')
//     cy.get('.js-header-nav a').each(($el, index) => {
//       // navList.push($el[0])
//       let hash = $el[0].hash
//       navCheck($el)
//       // cy.wrap($el).should('have.attr', 'href')
//       cy.wrap($el)
//         .click()
//         .wait(500)
//       cy.hash()
//         .should('eq', hash)
//         .wait(500)
//     })
//     //
//     // cy.pause()
//   })*/
// })

const menuList = ['about', 'motivation', 'howtohelp', 'contacts']

describe('Menu items', () => {
  // beforeEach(() => cy.viewport(767, 1024))

  const navCheck = hash => {
    it(`Click by #${hash}`, () => {
      cy.get(`[href='#${hash}']`).click()
      cy.hash().should('eq', `#${hash}`)
      // cy.scrollTo('top').wait(500)
      // cy.on('url:changed', e => {
      //   console.log(e)
      // })
    })
  }
  menuList.forEach(hash => navCheck(hash))
})

describe('Menu closed', () => {
  beforeEach(() => cy.viewport(767, 1024))

  it('Is closed', () => {
    cy.get('.js-header-nav-trigger').click()
    cy.get('.js-header-nav').should('not.be.visible')
  })
})

// describe('Viewport test', () => {
//   // afterEach(() => cy.screenshot())
//   beforeEach(() => cy.reload(true))

//   const setViewport = screen => {
//     it(`Set viewport ${screen.preset}`, () => {
//       cy.viewport(screen.preset).wait(200)
//     })

//     // it(`Take a screenshot ${screen.preset}`, () => {
//     //   cy.screenshot(`${screen.width}x${screen.height}`)
//     //   // cy.screenshot({ x: 0, y: 0, width: screen.width, height: screen.height })
//     // })
//   }
//   // viewports.forEach(screen => setViewport(screen))
// })