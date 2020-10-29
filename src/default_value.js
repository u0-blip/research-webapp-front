export const sections_name = ['Visualization', 'General', 'Geometry', 'Simulation', 'Source']

export const default_values = [
    {
        'check': {
            'structure': false,
            'transiant': false,
            'rms': true,
            'view_only_particles': true,
            'log_res': false,
        },
        'radio': {
        },
        'range': {
            'viz_offset': [0, 0, 0]
        },
        'input': {
            '3d_plotting_axis': 1,
            'frame_speed': 200,
        }
    },

    {
        'check': {

        },
        'radio': {
            //  'shape_types_dummy': ('cube', ('sphere', 'triangle', 'hexagon', 'cube'))
        },
        'range': {

        },
        'input': {
            'pml_thick': 0.5,
            'num_particles': 2,
        }
    },

    {
        'check': {

        },
        'radio': {
            'type': ['checker', ['checker', 'simple shape', 'voronoi']]
        },
        'range': {
            'particle_size': [0.05, 0.12, 1],
            'x_loc': [0, -3.4, 1],
            'distance': [1, 3, 1],
            'fill_factor': [0.5, 0.7, 1],
            'std': [0.1, 0.3, 1],

            'solid_center': [-0.8, 0, 0],
            'solid_size': [4, 4, 4],
            'cell_size': [10, 10, 10],
            'rotation': [0, 60, 1]
        },
        'input': {
            'dimension': 2,
            'resolution': 60,
            'change_res': 1,
            'time': 1000,
            'out_every': 0.2,
            'save_every': 30
        }
    },
    {
        'check': {
            'verbals': true,
            'gen vor': false,
            'meep sim': true,
            'gen gmsh': false,
            'process inp': false,
            'clean array': false,
            'sim abq': true,
        },
        'radio': {
        },
        'range': {

        },
        'input': {

        }
    },
    {
        'check': {
        },
        'radio': {
            'mode': ['normal', ['normal', 'gaussian', 'far_field_transform', 'waveguide']],
        },
        'range': {
            'size': [0, 8, 0],
            'center': [4, 0, 0],
            'near_flux_loc': [3.5, 0, 0],
            'far_flux_loc': [-4.5, 0, 0],
            'flux_size': [0, 9, 0],

        },
        'input': {
            'fcen': 0.8167,
            'tilt_angle': 0,
            'sigma': 2,
            'amp': 100,
            'flux_nfreq': 100,
            'fwidth': 2,
            'flux_width': 0.8,

        }
    }
]
