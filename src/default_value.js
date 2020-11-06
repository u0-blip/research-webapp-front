export const sections_name = ['Visualization', 'General', 'Geometry', 'Simulation', 'Source']
export const pics = ['structure'];
export const plots = ['eps', 'rms_block', 'rms_xy', 'rms_block_max', 'rms_particle_only', 'rms_particle_only_max', 'rms_block_log', 'rms_particle_only_log']
export const noPlots = ['rms_xy', 'rms_block_max', 'rms_particle_only_max']

export const optionalField = ['shape', 'particle_area_or_volume', 'x_loc', 'distance', 'fill_factor', 'std', 'rotation', 'num_particles', 'rand_seed', 'num_particles_vor', 'particle_location']
export const optionalFieldExist = {
    'checker': ['particle_area_or_volume', 'fill_factor', 'shape'],
    'shape': ['particle_area_or_volume', 'x_loc', 'distance', 'rotation', 'num_particles', 'shape', 'particle_location'],
    'effective medium': [],
    'voronoi': ['fill_factor', 'num_particles_vor', 'rand_seed', 'num_particles_vor']
}
export const optionalIncDecField = ['num_particles']

export const fieldNameDescription = {
    'std': {
        'name': 'standard deviation',
        'description': 'size standard deviation of particles'
    }
}

export const default_values = [
    // Visualization
    {
        'check': {
            'structure': true,
            'transiant': false,
            'rms': true,
            'view_only_particles': true,
            'log_res': false,
            'video': true,
        },
        'radio': {
        },
        'range': {
        },
        'coord': {

        },
        'input': {
            '3d_plotting_axis': 1,
            'frame_speed': 0.01,
        }
    },
    // General
    {
        'check': {
            gen_vor: false,
            perform_mp_sim: true,

            gen_gmsh: false,
            process_inp: false,
            clean_array: false,
            sim_abq: true,
        },
        'radio': {
            //  'shape_types_dummy': ('cube', ('sphere', 'triangle', 'hexagon', 'cube'))
        },
        'range': {

        },
        'input': {
        }
    },
    // Geometry
    {
        'check': {

        },
        'radio': {
            'shape': ['hexagon', ['sphere', 'triangle', 'hexagon', 'cube']],
            'particle_size_t': ['gaussian', ['fixed', 'gaussian']],
        },
        'coord': {
            'solid_center': [-0.8, 0, 0],
            'solid_size': [4, 4, 4],
            'cell_size': [10, 10, 10],
        },
        'material': {
            'eps': [1, 0, 3.5, 0.027429274, 7, 0.027429274, 10.5, 0.027429274, 5, 0.02],
        },
        'location': {
            'particle_location': [0, -2, 0, 0, 2, 0]
        },
        'material_assign': {
            'section': {
                'shape': [1, 1],
                'checker': [1, 2, 3, 4],
                'effective medium': [1, 2],
                'voronoi': [1, 2, 3, 4],
            },
        },
        'range': {
            'particle_area_or_volume': [1, 2, 1],
            'x_loc': [0, -3.4, 1],
            'distance': [1, 3, 1],
            'fill_factor': [0.5, 0.7, 1],
            'std': [0.1, 0.3, 1],
            'rotation': [0, 60, 1]
        },
        'input': {
            'pml_thick': 0.5,
            'num_particles': 2,
            'rand_seed': 15,
            'num_particles_vor': 60,
        }
    },
    // Simulation
    {
        'check': {
            'change_res': false,
        },
        'radio': {
            'sim_types': ['checker', ['checker', 'shape', 'effective medium', 'voronoi']]
        },
        'range': {

        },
        'input': {
            'dimension': 2,
            'resolution': 20,
            'time': 150,
            'start_factor': 2,
            'out_every': 2,
            'save_every': 30,

        }
    },
    // Source
    {
        'check': {
        },
        'radio': {
            'mode': ['normal', ['normal', 'gaussian', 'far_field_transform', 'waveguide']],
        },
        'coord': {
            'size': [0, 8, 0],
            'center': [4, 0, 0],
            'near_flux_loc': [3.5, 0, 0],
            'far_flux_loc': [-4.5, 0, 0],
            'flux_size': [0, 9, 0],
        },
        'range': {
        },
        'input': {
            'fcen': 2.35,
            'tilt_angle': 0,
            'sigma': 2,
            'amp': 100,
            'flux_nfreq': 100,
            'fwidth': 2,
            'flux_width': 0.8,

        }
    },
]
